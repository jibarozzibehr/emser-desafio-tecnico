from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from .models import Usuario, Proyecto, ProyectoUsuario
from django.shortcuts import get_object_or_404
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.exceptions import *
from utils.tokenManager import TokenManager
from utils.userTypes import UserTypes

# Create your views here.

class AuthView(View):
    #   Se ejecuta cada vez que hacemos una petición.
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        jsonData = json.loads(request.body)

        token = TokenManager.generateToken(jsonData["username"], jsonData["password"])

        if token:
            data = {'status': '0', 'accessToken': token}
        else:
            data = {'status': '1', 'description': "Invalid username or password."}

        return JsonResponse(data)

class ProjectView(View):

    #   Se ejecuta cada vez que hacemos una petición.
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):

        #jsonData = json.loads(request.body)
        jsonData = request.GET
        token = jsonData["accessToken"]

        if TokenManager.verifyToken(token):

            if jsonData.get("id") is not None:
                projects = list(Proyecto.objects.filter(id=jsonData["id"]).values())
                if len(projects) > 0:
                    data = data = {'status': '0', 'project': projects[0]}
                else:
                    data = {'status': '1', 'description': 'No projects found.'}
            else:
                projects = list(Proyecto.objects.values())

                if len(projects) > 0:
                    data = {'status': '0', 'projects': projects}
                else:
                    data = {'status': '1', 'description': 'No projects found.'}
        else:
            data = {'status': '2', 'description': 'You are not allowed to access this content.'}
        
        return JsonResponse(data)


    def post(self, request):
        jsonData = json.loads(request.body)
        token = jsonData["accessToken"]

        if TokenManager.verifyToken(token) and TokenManager.getUserRole(token) == UserTypes.SUPERUSER.value:
            Proyecto.objects.create(nombre=jsonData["nombre"])
            data = {'status': '0', 'description': "Project added."}
        else:
            data = {'status': '2', 'description': 'You are not allowed to perform this action.'}

        return JsonResponse(data)

    def put(self, request):
        jsonData = json.loads(request.body)
        token = jsonData["accessToken"]

        if TokenManager.verifyToken(token) and TokenManager.getUserRole(token) == UserTypes.SUPERUSER.value:
            projects = list(Proyecto.objects.filter(id=jsonData["id"]).values())
            
            if len(projects) > 0:
                project = Proyecto.objects.get(id=jsonData["id"])   # Lanza una excepción si no lo encuentra; a diferencia del filter().
                project.nombre = jsonData["nombre"]
                project.activo = jsonData["activo"]
                project.save()
                
                data = {'status': '0', 'description': 'Success'}
            else:
                data = {'status': '1', 'description': 'No projects found.'}
        else:
            data = {'status': '2', 'description': 'You are not allowed to perform this action.'}
        
        return JsonResponse(data)

    def delete(self, request):
        jsonData = json.loads(request.body)
        token = jsonData["accessToken"]

        if TokenManager.verifyToken(token) and TokenManager.getUserRole(token) == UserTypes.SUPERUSER.value:
            projects = list(Proyecto.objects.filter(id=jsonData["id"]).values())
            if len(projects) > 0:
                Proyecto.objects.filter(id=jsonData["id"]).delete()
                data = {'status': '0', 'description': 'Success'}
            else:
                data = {'status': '1', 'description': 'No projects found.'}
        else:
            data = {'status': '2', 'description': 'You are not allowed to perform this action.'}

        return JsonResponse(data)


class UserView(View):

    #   Para el CORS. Se ejecuta cada vez que hacemos una petición.
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


    def get(self, request):
        #jsonData = json.loads(request.body)
        jsonData = request.GET
        token = jsonData["accessToken"]

        if TokenManager.verifyToken(token):
            if jsonData.get("id") is not None:
                users = list(Usuario.objects.filter(id=jsonData["id"]).values())
                if len(users) > 0:
                    data = data = {'status': '0', 'user': users[0]}
                else:
                    data = {'status': '1', 'description': 'No users found.'}
                return JsonResponse(data)
            else:
                users = list(Usuario.objects.values())

                if len(users) > 0:
                    data = {'status': '0', 'users': users}
                else:
                    data = {'status': '1', 'description': 'No users found.'}
        else:
            data = {'status': '2', 'description': 'You are not allowed to access this content.'}
        
        return JsonResponse(data)

        



    def userExists(self, username) -> bool:
        users = list(Usuario.objects.filter(username=username).values())
        return True if len(users) > 0 else False

    def post(self, request):
        jsonData = json.loads(request.body)
        token = jsonData["accessToken"]

        if TokenManager.verifyToken(token) and TokenManager.getUserRole(token) == UserTypes.SUPERUSER.value:
            if self.userExists(username=jsonData["username"]):
                data = {'status': '2', 'description': 'Error adding the user: the username already exists.'}
            else:
                Usuario.objects.create(username=jsonData["username"], password=jsonData["password"], nombre=jsonData["nombre"], apellido=jsonData["apellido"], telefono=jsonData["telefono"], email=jsonData["email"], tipo=jsonData["tipo"], activo=True)

                data = {'status': '0', 'description': 'User added.'}
        else:
            data = {'status': '2', 'description': 'You are not allowed to perform this action.'}

        return JsonResponse(data)


    def put(self, request):
        jsonData = json.loads(request.body)

        token = jsonData["accessToken"]

        if TokenManager.verifyToken(token) and TokenManager.getUserRole(token) == UserTypes.SUPERUSER.value:

            users = list(Usuario.objects.filter(id=jsonData["id"]).values())
        
            if len(users) > 0:
                user = Usuario.objects.get(id=jsonData["id"])   # Lanza una excepción si no lo encuentra; a diferencia del filter().
                user.username = jsonData["username"]
                user.password = jsonData["password"]
                user.nombre = jsonData["nombre"]
                user.apellido = jsonData["apellido"]
                user.telefono = jsonData["telefono"]
                user.email = jsonData["email"]
                user.tipo = jsonData["tipo"]
                user.activo = jsonData["activo"]
                user.save()
                data = {'status': '0', 'description': 'Success.'}
            else:
                data = {'status': '1', 'description': 'No users found.'}

        else:
            data = {'status': '2', 'description': 'You are not allowed to perform this action.'}
    
        return JsonResponse(data)

    def delete(self, request):

        jsonData = json.loads(request.body)
        token = jsonData["accessToken"]

        if TokenManager.verifyToken(token) and TokenManager.getUserRole(token) == UserTypes.SUPERUSER.value:
            users = list(Usuario.objects.filter(id=jsonData["id"]).values())
            if len(users) > 0:
                Usuario.objects.filter(id=jsonData["id"]).delete()
                data = {'status': '0', 'description': 'Success.'}
            else:
                data = {'status': '1', 'description': 'No users found.'}

        else:
            data = {'status': '2', 'description': 'You are not allowed to perform this action.'}

        return JsonResponse(data)


class ProjectUserView(View):
    #   Para el CORS. Se ejecuta cada vez que hacemos una petición.
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):

        #jsonData = json.loads(request.body)
        jsonData = request.GET
        token = jsonData["accessToken"]

        if TokenManager.verifyToken(token):

            pu = ProyectoUsuario.objects.all()
            projectsUsers = []

            for projectUser in pu:
                projectUserData = {}
                projectUserData["id"] = projectUser.id
                projectUserData["username"] = projectUser.usuario_id.username
                projectUserData["project"] = projectUser.proyecto_id.nombre

                projectsUsers.append(projectUserData)
        
            return HttpResponse('{"status": 0, "projectsUsers":' + json.dumps(projectsUsers) + '}', 'application/json')
        else:
            return HttpResponse('{"status": 2, "description": "You are not allowed to access this content."}', 'application/json')


    def userExists(self, id) -> bool:
        users = list(Usuario.objects.filter(id=id).values())
        return True if len(users) > 0 else False

    def projectExists(self, id) -> bool:
        projects = list(Proyecto.objects.filter(id=id).values())
        return True if len(projects) > 0 else False

    def post(self, request):
        jsonData = json.loads(request.body)
        token = jsonData["accessToken"]

        if TokenManager.verifyToken(token) and TokenManager.getUserRole(token) == UserTypes.SUPERUSER.value:

            if not self.userExists(jsonData["usuarioId"]) or not self.projectExists(jsonData["proyectoId"]):
                data = {'status': '1', 'description': 'User and/or project don\'t exist.'}
            else:
                ProyectoUsuario.objects.create(proyecto_id=Proyecto(id=jsonData["proyectoId"]), usuario_id=Usuario(id=jsonData["usuarioId"]), activo=True)
                data = {'status': '0', 'description': 'User added to project.'}
        else:
            data = {'status': '2', 'description': 'You are not allowed to perform this action.'}
        return JsonResponse(data)

    def put(self, request):
        jsonData = json.loads(request.body)
        token = jsonData["accessToken"]

        if TokenManager.verifyToken(token) and TokenManager.getUserRole(token) == UserTypes.SUPERUSER.value:

            if not self.userExists(jsonData["usuarioId"]) or not self.projectExists(jsonData["proyectoId"]):
                data = {'status': '1', 'description': 'User and/or project don\'t exist.'}
            else:
                projectUser = ProyectoUsuario.objects.get(id=jsonData["id"])

                projectUser.proyecto_id = Proyecto.objects.get(id=jsonData["proyectoId"])
                projectUser.usuario_id = Usuario.objects.get(id=jsonData["usuarioId"])

                projectUser.save()

                data = {'status': '0', 'description': 'Success.'}
        else:
            data = {'status': '2', 'description': 'You are not allowed to perform this action.'}

        return JsonResponse(data)

    def delete(self, request):
        jsonData = json.loads(request.body)
        token = jsonData["accessToken"]

        if TokenManager.verifyToken(token) and TokenManager.getUserRole(token) == UserTypes.SUPERUSER.value:

            users = list(ProyectoUsuario.objects.filter(id=jsonData["id"]).values())

            if len(users) > 0:
                ProyectoUsuario.objects.filter(id=jsonData["id"]).delete()
                data = {'status': '0', 'description': 'Success.'}
            else:
                data = {'status': '1', 'description': 'No Proyecto-Usuario found.'}

        else:
            data = {'status': '2', 'description': 'You are not allowed to perform this action.'}

        return JsonResponse(data)