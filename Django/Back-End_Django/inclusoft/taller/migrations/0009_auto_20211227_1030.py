# Generated by Django 3.2.8 on 2021-12-27 13:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('taller', '0008_auto_20211227_1027'),
    ]

    operations = [
        migrations.RenameField(
            model_name='taller',
            old_name='alumno',
            new_name='alumnos',
        ),
        migrations.RenameField(
            model_name='taller',
            old_name='personal',
            new_name='personals',
        ),
    ]
