# Generated by Django 3.2.8 on 2021-12-31 04:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('alumno', '0016_enfermeria_fecha_observacion'),
        ('taller', '0020_auto_20211231_0152'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taller',
            name='alumno',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='alumno.alumno'),
            preserve_default=False,
        ),
    ]