# Generated by Django 3.2.8 on 2021-12-20 03:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alumno', '0016_enfermeria_fecha_observacion'),
        ('taller', '0003_inventario_taller_materiales_fin_ciclo'),
    ]

    operations = [
        migrations.CreateModel(
            name='AlumnoxTaller',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dias', models.CharField(max_length=50)),
                ('horarios', models.TimeField()),
                ('alumno', models.ManyToManyField(to='alumno.Alumno')),
            ],
        ),
    ]
