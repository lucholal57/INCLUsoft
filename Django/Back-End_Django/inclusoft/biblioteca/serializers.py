from rest_framework import  fields, serializers
from .models import (Socio,Libro,PrestamoLibro,DevolucionLibro)
from alumno.serializers import AlumnoSerializer

#serializers

class SocioSerializer(serializers.ModelSerializer):
    """ Serializador de Socios"""
    alumno = AlumnoSerializer(read_only=True)
    class Meta:
        model = Socio
        fields = '__all__'
        depth = 2
        
class SocioPostPutSerializer(serializers.ModelSerializer):
    """ Serializador de Socios"""
    class Meta:
        models = Socio
        fields = '__all__'

class LibroSerializer(serializers.ModelSerializer):
    """ Serializador de Libros"""
    class Meta:
        model : Libro
        fields = '__all__'
        
class PrestamoLibroSerializer(serializers.ModelSerializer):
    """ Serializador de Prestamos"""
    alumno = AlumnoSerializer(read_only=True)
    libro = LibroSerializer(read_only=True)
    class Meta:
        model = PrestamoLibro
        fields = '__all__'
        depth = 2
        
class PrestamoLibroPostPutSerializer(serializers.ModelSerializer):
    """ Serializador de Prestamos"""
    class Meta:
        model = PrestamoLibro
        fields = '__all__'

class DevolucionLibroSerializer(serializers.ModelSerializer):
    """ Serializador de Devolucion""" 
    prestamo = PrestamoLibroSerializer(read_only=True)
    class Meta:
        model = DevolucionLibro
        fields = '__all__'
        depth = 2

class DevolucionLibroPostPutSerializer(serializers.ModelSerializer):
    """ Serializador de Devolucion""" 
    class Meta:
        model = DevolucionLibro
        fields = '__all__'
        depth = 2