from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse
from .models import Usuario, Proyecto
from django.shortcuts import get_object_or_404
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.exceptions import *

# Create your views here.

class ProjectView(View):

    #   Se ejecuta cada vez que hacemos una petición.
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):

        if id != 0:
            projects = list(Proyecto.objects.filter(id=id).values())
            if len(projects) > 0:
                project = projects[0]
                data = data = {'status': '0', 'project': project}
            else:
                data = {'status': '1', 'description': 'No projects found.'}
            return JsonResponse(data)
        else:
            projects = list(Proyecto.objects.values())

            if len(projects) > 0:
                data = {'status': '0', 'projects': projects}
            else:
                data = {'status': '1', 'description': 'No projects found.'}
            return JsonResponse(data)

    def post(self, request):
        jsonData = json.loads(request.body)

        Proyecto.objects.create(nombre=jsonData["nombre"], activo=jsonData["activo"])

        data = {'status': '0', 'request body': jsonData}

        return JsonResponse(data)

    def put(self, request, id):
        jsonData = json.loads(request.body)
        projects = list(Proyecto.objects.filter(id=id).values())
        
        if len(projects) > 0:
            project = Proyecto.objects.get(id=id)   # Lanza una excepción si no lo encuentra; a diferencia del filter().
            project.nombre = jsonData["nombre"]
            project.activo = jsonData["activo"]
            project.save()
            data = {'status': '0', 'description': 'Success'}
        else:
            data = {'status': '1', 'description': 'No projects found.'}
        
        return JsonResponse(data)

    def delete(self, request, id):
        projects = list(Proyecto.objects.filter(id=id).values())
        if len(projects) > 0:
            Proyecto.objects.filter(id=id).delete()
            data = {'status': '0', 'description': 'Success'}
        else:
            data = {'status': '1', 'description': 'No projects found.'}

        return JsonResponse(data)


class UserView(View):

    #   Para el CORS. Se ejecuta cada vez que hacemos una petición.
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if id != 0:
            users = list(Usuario.objects.filter(id=id).values())
            if len(users) > 0:
                project = users[0]
                data = data = {'status': '0', 'project': project}
            else:
                data = {'status': '1', 'description': 'No users found.'}
            return JsonResponse(data)
        else:
            users = list(Usuario.objects.values())

            if len(users) > 0:
                data = {'status': '0', 'users': users}
            else:
                data = {'status': '1', 'description': 'No users found.'}
            return JsonResponse(data)


    def userExists(self, username) -> bool:
        users = list(Usuario.objects.filter(username=username).values())
        return True if len(users) > 0 else False

    def post(self, request):
        jsonData = json.loads(request.body)

        if self.userExists(username=jsonData["username"]):
            data = {'status': '2', 'description': 'Error adding the user: the username already exists.'}
        else:
            Usuario.objects.create(username=jsonData["username"], password=jsonData["password"], nombre=jsonData["nombre"], apellido=jsonData["apellido"], telefono=jsonData["telefono"], email=jsonData["email"], tipo=jsonData["tipo"], activo=jsonData["activo"])

            data = {'status': '0', 'description': 'User added.'}
        return JsonResponse(data)

    def put(self, request, id):
        jsonData = json.loads(request.body)

        users = list(Usuario.objects.filter(id=id).values())
    
        if len(users) > 0:
            user = Usuario.objects.get(id=id)   # Lanza una excepción si no lo encuentra; a diferencia del filter().
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
    
        return JsonResponse(data)

    def delete(self, request, id):
        users = list(Usuario.objects.filter(id=id).values())
        if len(users) > 0:
            Usuario.objects.filter(id=id).delete()
            data = {'status': '0', 'description': 'Success.'}
        else:
            data = {'status': '1', 'description': 'No users found.'}

        return JsonResponse(data)