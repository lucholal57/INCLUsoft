# Generated by Django 3.2.8 on 2022-03-05 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cooperadora', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cooperadora',
            name='entrada',
            field=models.CharField(default=10, max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cooperadora',
            name='salida',
            field=models.CharField(default=10, max_length=50),
            preserve_default=False,
        ),
    ]
