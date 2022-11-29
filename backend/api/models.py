from django.db import models

# Create your models here.
class Proyecto(models.Model):
    id = models.BigAutoField(primary_key=True)
    nombre = models.CharField(max_length=64, unique=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=64, unique=True)
    password = models.CharField(max_length=64)
    nombre = models.CharField(max_length=64)
    apellido = models.CharField(max_length=64)
    telefono = models.BigIntegerField()
    email = models.EmailField(max_length=256)
    tipo = models.IntegerField()
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

class ProyectoUsuario(models.Model):
    id = models.AutoField(primary_key=True)
    usuario_id = models.ForeignKey(to=Usuario, on_delete=models.CASCADE)
    proyecto_id = models.ForeignKey(to=Proyecto, on_delete=models.CASCADE)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.usuario_id.nombre + " - " + self.proyecto_id.nombre
