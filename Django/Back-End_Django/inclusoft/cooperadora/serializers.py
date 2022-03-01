from dataclasses import fields
from rest_framework import serializers
from .models import Cooperadora

#Serializadores
class CooperadoraSerializer(serializers.ModelSerializer):
    """ Serializador de Cooperadora"""
    class Meta:
        model = Cooperadora
        fields = '__all__'