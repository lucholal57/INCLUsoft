# Generated by Django 3.2.8 on 2022-01-13 00:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('acompañantes', '0004_auto_20220110_2158'),
    ]

    operations = [
        migrations.RenameField(
            model_name='acompañante',
            old_name='observaciones_acompañante',
            new_name='observaciones_acompanante',
        ),
    ]
