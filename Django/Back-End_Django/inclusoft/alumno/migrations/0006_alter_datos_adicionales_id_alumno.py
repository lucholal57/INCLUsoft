# Generated by Django 3.2 on 2021-04-27 01:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('alumno', '0005_alter_datos_adicionales_id_alumno'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datos_adicionales',
            name='id_alumno',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='alumno', to='alumno.alumno'),
        ),
    ]
