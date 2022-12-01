import jwt
import os
import json

from api.models import Usuario, Proyecto, ProyectoUsuario

class TokenManager:

    @staticmethod
    def generateToken(username, password):
        key = str(os.environ.get('JWT_SIGNATURE'))

        try:
            user = Usuario.objects.filter(username=username, password=password)[:1].get()
            token = jwt.encode({ "usuarioId": user.id, "tipo": user.tipo, "username": user.username }, key, algorithm="HS256")
            return token
        except Usuario.DoesNotExist:
            return False

    @staticmethod
    def verifyToken(token):
        key = str(os.environ.get('JWT_SIGNATURE'))

        try:
            payload = jwt.decode(token, key, algorithms="HS256")
            return payload
            
        except (jwt.exceptions.InvalidSignatureError, jwt.exceptions.DecodeError):
            return False

    def getUserRole(token):
        key = str(os.environ.get('JWT_SIGNATURE'))

        try:
            payload = jwt.decode(token, key, algorithms="HS256")
            return payload["tipo"]
            
        except jwt.exceptions.InvalidSignatureError:
            return 0