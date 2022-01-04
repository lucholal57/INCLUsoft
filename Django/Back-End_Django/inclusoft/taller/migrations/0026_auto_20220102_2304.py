# Generated by Django 3.2.8 on 2022-01-03 02:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alumno', '0016_enfermeria_fecha_observacion'),
        ('personal', '0002_auto_20210916_1801'),
        ('taller', '0025_auto_20211231_0216'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taller',
            name='alumnos_id',
            field=models.ManyToManyField(related_name='alumnos', to='alumno.Alumno'),
        ),
        migrations.AlterField(
            model_name='taller',
            name='personal_id',
            field=models.ManyToManyField(related_name='personals', to='personal.Personal'),
        ),
    ]