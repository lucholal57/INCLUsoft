# Generated by Django 3.2.8 on 2021-12-31 04:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('alumno', '0016_enfermeria_fecha_observacion'),
        ('taller', '0019_remove_taller_personal_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='taller',
            name='alumno_id',
        ),
        migrations.AddField(
            model_name='taller',
            name='alumno',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='alumno.alumno'),
        ),
    ]