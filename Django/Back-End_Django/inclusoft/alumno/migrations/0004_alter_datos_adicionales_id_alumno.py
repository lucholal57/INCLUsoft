# Generated by Django 3.2 on 2021-04-27 00:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('alumno', '0003_auto_20210417_1427'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datos_adicionales',
            name='id_alumno',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='alumno.alumno'),
        ),
    ]
