# Generated by Django 3.2.8 on 2022-03-07 21:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taller', '0034_alter_ventas_taller_ganancia'),
    ]

    operations = [
        migrations.AlterField(
            model_name='compras_taller',
            name='cantidad',
            field=models.IntegerField(max_length=10),
        ),
    ]