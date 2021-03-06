# Generated by Django 3.2 on 2021-04-17 17:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('alumno', '0002_rename_vigencia_cerificado_datos_adicionales_vigencia_certificado'),
    ]

    operations = [
        migrations.AlterField(
            model_name='acta_compromiso',
            name='id_alumno',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='alumno.alumno'),
        ),
        migrations.AlterField(
            model_name='antecedente_medico',
            name='id_alumno',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='alumno.alumno'),
        ),
        migrations.AlterField(
            model_name='asistencia_alumno',
            name='id_alumno',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='alumno.alumno'),
        ),
        migrations.AlterField(
            model_name='datos_adicionales',
            name='id_alumno',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='alumno.alumno'),
        ),
        migrations.AlterField(
            model_name='enfermeria',
            name='id_alumno',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='alumno.alumno'),
        ),
        migrations.AlterField(
            model_name='patologia',
            name='id_alumno',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='alumno.alumno'),
        ),
        migrations.AlterField(
            model_name='patologia',
            name='id_antecedente_medico',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='alumno.antecedente_medico'),
        ),
    ]
