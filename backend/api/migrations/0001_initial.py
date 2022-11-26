# Generated by Django 4.1.3 on 2022-11-26 09:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Proyecto',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=64, unique=True)),
                ('activo', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=64, unique=True)),
                ('password', models.CharField(max_length=64)),
                ('nombre', models.CharField(max_length=64)),
                ('apellido', models.CharField(max_length=64)),
                ('telefono', models.BigIntegerField()),
                ('email', models.EmailField(max_length=256)),
                ('tipo', models.IntegerField()),
                ('activo', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='ProyectoUsuario',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('activo', models.BooleanField()),
                ('proyecto_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.proyecto')),
                ('usuario_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuario')),
            ],
        ),
    ]