# Generated by Django 3.2 on 2021-09-16 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='permiso_salida',
            name='alumno',
        ),
        migrations.AlterField(
            model_name='asistencia_personal',
            name='hora_ingreso',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='asistencia_personal',
            name='hora_salida',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='permiso_salida',
            name='horario_regreso',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='permiso_salida',
            name='horario_salida',
            field=models.TimeField(),
        ),
    ]
