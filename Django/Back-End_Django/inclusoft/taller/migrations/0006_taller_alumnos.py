# Generated by Django 3.2.8 on 2021-12-27 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alumno', '0016_enfermeria_fecha_observacion'),
        ('taller', '0005_delete_alumnoxtaller'),
    ]

    operations = [
        migrations.AddField(
            model_name='taller',
            name='alumnos',
            field=models.ManyToManyField(to='alumno.Alumno'),
        ),
    ]