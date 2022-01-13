from rest_framework import serializers
from .models import  Acompañante
from alumno.serializers import AlumnoSerializer
from personal.serializers import PersonalSerializer

# Serializadores 

class AcompañanteSerializer(serializers.ModelSerializer):
    """ Serializador de acompañantes"""
    alumno = AlumnoSerializer(read_only=True)
    personal = PersonalSerializer(read_only=True)
    
    class Meta:
        model = Acompañante
        fields = '__all__'
        depth = 2
        
class AcompañantePostPutSerializer(serializers.ModelSerializer):
    """ Serialializador para crear y actualizar acompañantes"""
    class Meta:
        model = Acompañante
        fields = '__all__'
        