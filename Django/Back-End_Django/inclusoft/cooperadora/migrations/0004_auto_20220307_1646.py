# Generated by Django 3.2.8 on 2022-03-07 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cooperadora', '0003_auto_20220306_0213'),
    ]

    operations = [
        migrations.AddField(
            model_name='cooperadora',
            name='entradas',
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