from rest_framework import serializers
from .models import (Personal, Permiso_Salida, Evaluacion_Laboral, Asistencia_Personal, Entrega_Proyecto)

#Serializadores

class PersonalSerializer(serializers.ModelSerializer):
    """
        Serializador del Personal
    """
    class Meta:
        model = Personal
        fields = '__all__' 

class AsistenciaSerializer(serializers.ModelSerializer):
    """
        Serializador de Asistencia Personal con Personal incluido por eso en el nombre figuran dos veces la palabra personal
    """
    personal =  PersonalSerializer(read_only=True)
    class Meta:
        model = Asistencia_Personal
        fields = '__all__'
        depth = 2     
class AsistenciaPostPutSerializer(serializers.ModelSerializer):
    """
        Serializador Asistencia Personal Solamente
    """
    class Meta:
        model = Asistencia_Personal
        fields = '__all__'     
        

class Permiso_SalidaSerializer(serializers.ModelSerializer):
    """
        Serialiador de Permisos de Salida con Personal
    """
    personal = PersonalSerializer(read_only=True)
    class Meta:
        model = Permiso_Salida
        fields = '__all__'
        depth = 2      
        
class Permiso_SalidaPostPutSerializer(serializers.ModelSerializer):
    """
        Serializador de Permisos de Salida
    """
    class Meta:
        model = Permiso_Salida
        fields = '__all__'

class Evaluacion_LaboralSerializer(serializers.ModelSerializer):
    """
        Serializador de Evaluacion Laboral con Personal
    """
    personal =  PersonalSerializer(read_only=True)
    class Meta:
        model = Evaluacion_Laboral
        fields = '__all__'
        depth = 2       
class Evaluacion_LaboralPostPutSerializer(serializers.ModelSerializer):
    """
        Serializador Evaluacion Laboral
    """
    class Meta:
        model = Evaluacion_Laboral
        fields = '__all__'

class Entrega_ProyectoSerializer(serializers.ModelSerializer):
    """
        Serializador Entrega de Proyectos con personal
    """
    personal = PersonalSerializer(read_only=True)
    class Meta:
        model = Entrega_Proyecto
        fields = '__all__'
        depth = 2       
class Entrega_ProyectoPostPutSerializer(serializers.ModelSerializer):
    """
        Serializador Entrega Proyecto
    """        
    class Meta:
        model = Entrega_Proyecto
        fields = '__all__'