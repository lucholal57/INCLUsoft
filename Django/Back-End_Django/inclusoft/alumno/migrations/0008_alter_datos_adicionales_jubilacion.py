# Generated by Django 3.2 on 2021-04-27 04:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alumno', '0007_rename_id_alumno_datos_adicionales_alumno'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datos_adicionales',
            name='jubilacion',
            field=models.BooleanField(max_length=10, null=True),
        ),
    ]
