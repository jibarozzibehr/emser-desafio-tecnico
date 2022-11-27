from django.contrib import admin
from .models import Usuario, Proyecto, ProyectoUsuario

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Proyecto)
admin.site.register(ProyectoUsuario)