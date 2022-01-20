from rest_framework import serializers
from .models import Viaje

from alumno.serializers import AlumnoSerializer
from personal.serializers import PersonalSerializer

# Serializadores
class ViajeSerializer(serializers.ModelSerializer):
    """ Serializador de viejes"""
    alumno = AlumnoSerializer(many=True)
    personal = PersonalSerializer(many=True)
    
    class Meta:
        model = Viaje
        fields = '__all__'
        depth = 2
        
class ViajePostPutSerializer(serializers.ModelSerializer):
    """ Serializador de viajes para crear y editar"""
    
    class Meta:
        model = Viaje
        fields = '__all__'
        depth = 2
        
class ViajeObtenerEdicionSerializer(serializers.ModelSerializer):
    """ Serializador de viajes solo para obtener datos para la edicion sin Depth"""
    
    class Meta:
        model = Viaje
        fields = '__all__'
