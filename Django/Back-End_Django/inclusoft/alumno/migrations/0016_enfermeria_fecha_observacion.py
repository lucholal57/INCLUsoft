# Generated by Django 3.2 on 2021-05-26 17:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alumno', '0015_remove_patologia_id_antecedente_medico'),
    ]

    operations = [
        migrations.AddField(
            model_name='enfermeria',
            name='fecha_observacion',
            field=models.DateField(null=True),
        ),
    ]
