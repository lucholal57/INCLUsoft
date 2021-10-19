from rest_framework import  fields, serializers
from .models import (Alumno, Acta_Compromiso, Antecedente_Medico, Asistencia_Alumno, Datos_Adicionales, Enfermeria, Patologia)

#Serializadores

class AlumnoSerializer(serializers.ModelSerializer):
    """
        Serializador del alumno
    
    """
    class Meta:
        model = Alumno
        fields = '__all__'
        
class Datos_AdicionalesAlumnoSerializer(serializers.ModelSerializer):
    """
        Serializador de Datos Adicionales con alumnos
    
    """
    alumno = AlumnoSerializer(read_only=True)
    class Meta:
        model = Datos_Adicionales
        fields = '__all__'
        depth = 2                     
class Datos_AdicionalesSerializer(serializers.ModelSerializer):
    """ 
        Serializador de Datos Adicionales
    """
    class Meta:
        model = Datos_Adicionales
        fields = '__all__'
        
class Asistencia_AlumnoSerializer(serializers.ModelSerializer):
    """
        Serializador de Asistencia con alumnos
    
    """
    alumnos = AlumnoSerializer(read_only=True)
    class Meta:
        model = Asistencia_Alumno
        fields = '__all__'
        depth = 2               
class AsistenciaSerializer(serializers.ModelSerializer):
    """
        Serializador de Asistencias

    """
    class Meta:
        model = Asistencia_Alumno
        fields = '__all__'
        
class Antecedente_MedicoAlumnoSerializer(serializers.ModelSerializer):
    """
        Serializador de antecedentes medicos con alumnos
    
    """
    alumnos = AlumnoSerializer(read_only=True)
    class Meta:
        model = Antecedente_Medico
        fields = '__all__'
        depth = 2       
class Antecedente_MedicoSerializer(serializers.ModelSerializer):
    """
        serializador de antecedentes medicos
    
    """    
    class Meta:
        model = Antecedente_Medico
        fields = '__all__' 
        
class PatologiaAlumnoSerializer(serializers.ModelSerializer):
    """
         Serializador de patologias con alumnos
    
    """    
    alumnos = AlumnoSerializer(read_only=True)  
    class Meta:
          model = Patologia
          fields = '__all__'
          depth = 2         
class PatologiaSerializer(serializers.ModelSerializer):
    """
        Serializador de patologias
    
    """
    class Meta:
        model = Patologia
        fields = '__all__'
    
class  Acta_CompromisoAlumnoSerializer(serializers.ModelSerializer):
    """
        Serializador de acta compromiso con alumnos
    
    """       
    alumno = AlumnoSerializer(read_only=True)
    class Meta:
        model = Acta_Compromiso
        fields = '__all__'
        depth = 2
class Acta_CompromisoSerializer(serializers.ModelSerializer):
    """
        Serializador de Actas de compromiso
    
    """
    class Meta:
        model = Acta_Compromiso
        fields = '__all__'

class EnfermeriaAlumnoSerializer(serializers.ModelSerializer):
    """
        Serializador de enfermeria con alumnos
    
    """        
    alumnos = AlumnoSerializer(read_only=True)
    class Meta:
        model = Enfermeria
        fields = '__all__'
        depth = 2        
class EnfermeriaSerializer(serializers.ModelSerializer):
    """
        Serializador de enfermeria
    
    """
    class Meta:
        model = Enfermeria
        fields = '__all__'