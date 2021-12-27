from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import (Alumno, Acta_Compromiso, Antecedente_Medico,
Asistencia_Alumno, Datos_Adicionales, Enfermeria, Patologia)
from .serializers import (Acta_CompromisoAlumnoSerializer, AlumnoSerializer, Antecedente_MedicoSerializer, AsistenciaSerializer, Datos_AdicionalesAlumnoSerializer,  Asistencia_AlumnoSerializer, Antecedente_MedicoAlumnoSerializer, Datos_AdicionalesSerializer, EnfermeriaAlumnoSerializer, PatologiaAlumnoSerializer, PatologiaSerializer, Acta_CompromisoSerializer, EnfermeriaSerializer)

# Create your views here.

#VIEW DE ALUMNOS

class AlumnoListado(APIView):

    """
        view de listado de todos los alumnos

    """

    def get(self, request):
        alumno = Alumno.objects.all().order_by('id')
        serializer = AlumnoSerializer(alumno, many=True)
        return Response(serializer.data)

class AlumnoBuscarPorId(APIView):
    """
        view de buscar alumno por ID

    """
    def get(self, request, pk):
        alumno = Alumno.objects.filter(id=pk)
        serializer = AlumnoSerializer(alumno, many=True)
        return Response(serializer.data)

class AlumnoRegistrar(APIView):
    """
        view para registrar alumnos

    """

    def post(self, request):
        alumno = Alumno.objects.all()
        serializer = AlumnoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

class AlumnoEditar(APIView):
    """
        view para editar el alumno

    """

    def put(self, request, pk):
        alumno = Alumno.objects.get(id=pk)
        serializer = AlumnoSerializer(alumno, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

class AlumnoEliminar(APIView):
    """
        view para eliminar un alumno
    
    """
    def delete(self, request, pk):
        alumno = Alumno.objects.get(id=pk)
        alumno.delete()
        #No funciona con el metodo que da el ejemplo en en video 
        #Este...
        return Response(status=status.HTTP_204_NO_CONTENT)
        #return Response("Alumno eliminado")
        
#VIEW DE DATOS ADICIONALES
    
class DatosAdicionalesListado(APIView):
    """
        view para listar los datos adicionales con respecto a un alumno
    
    """
    def get(self, request):
        datos_adicionales = Datos_Adicionales.objects.all().order_by('id')
        serializer = Datos_AdicionalesAlumnoSerializer(datos_adicionales, many = True)
        return Response(serializer.data)
    
class DatosAdicionalesBuscarPorId(APIView):
    """
        view de busqueda por id de datos adicionales para mostrar en los input
    
    """
    def get(self,request,pk):
        datos_adicionales = Datos_Adicionales.objects.filter(id=pk)
        serializer = Datos_AdicionalesSerializer(datos_adicionales, many=True)
        return Response(serializer.data)
    
class DatosAdicionalesRegistrar(APIView):
    
    """
        view para registrar datos adicionales de un alumno
    
    """
    def post(self, request):
        datos_adicionales = Datos_Adicionales.objects.all()
        serializer = Datos_AdicionalesSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class DatosAdicionalesEditar(APIView):
    """
        view para editar datos adicionales
    
    """
    def put(self,request,pk):
        datos_adicionales = Datos_Adicionales.objects.get(id=pk)
        serializer = Datos_AdicionalesSerializer(datos_adicionales , data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class DatosAdicionalesEliminar(APIView):
    """
        view para elimiar datos adicionales
    
    """
    def delete(self,request,pk):
        datos_adicionales = Datos_Adicionales.objects.get(id=pk)
        datos_adicionales.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
#VIEW DE ASISTENCIAS

class AsistenciaListado(APIView):
    """"
        view para listar las asistencias con respecto a un alumno
        
    """ 
    def get(self,request):
        asistencia = Asistencia_Alumno.objects.all().order_by('id')
        serializer = Asistencia_AlumnoSerializer(asistencia, many=True)
        return Response(serializer.data)    
    
class AsistenciaBuscarPorId(APIView):
    """
        view de busqueda por id de asistencias para mostrar en los input
    
    """
    def get(self, request,pk):
        asistencia = Asistencia_Alumno.objects.filter(id=pk)
        serializer = AsistenciaSerializer(asistencia, many = True)
        return Response(serializer.data)
    
class AsistenciaRegistrar(APIView):
    
    """
        views para registrar asistencias
    
    """
    def post(self,request):
        asistencia = Asistencia_Alumno.objects.all()
        serializer = AsistenciaSerializer(data =  request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class AsistenciaEditar(APIView):
    """
        views para editar asistencia
    
    """      
    def put(self,request,pk):
        asistencia = Asistencia_Alumno.objects.get(id=pk)
        serializer = AsistenciaSerializer(asistencia, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class AsistenciaEliminar(APIView):
    """
        view para eliminar asistencias
    
    """
    def delete(self,request,pk):
        asistencia = Asistencia_Alumno.objects.get(id=pk)
        asistencia.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
#VIEW DE ANTECEDENTES MEDICOS

class AntecedenteMedicoListado(APIView):
    """
        view para listar antecedentes medicos con respecto a un alumnos
    
    """
    def get(self, request):
        antecedente_medico = Antecedente_Medico.objects.all().order_by('id')
        serializer = Antecedente_MedicoAlumnoSerializer(antecedente_medico, many = True)
        return Response(serializer.data)
    
class AntecedenteMedicoBuscarPorId(APIView):
    """
        view de busqueda por id de antecedentes medicos para mostrar en los input
    """
    def get(self, request, pk):
        antecedente_medico = Antecedente_Medico.objects.filter(id=pk)
        serializer = Antecedente_MedicoSerializer(antecedente_medico, many = True)
        return Response(serializer.data)
    
class AntecedenteMedicoregistrar(APIView):
    
    """
        view para registrar antecedentes medicos
    """   
    def post(self, request):
        serializer = Antecedente_MedicoSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class AntecedenteMedicoEditar(APIView):
    """
        view para editar antecedentes medicos
    """        
    def put(self,request,pk):
        antecedente_medico = Antecedente_Medico.objects.get(id=pk)
        serializer = Antecedente_MedicoSerializer(antecedente_medico, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class AntecedenteMedicoEliminar(APIView):
    
    """
        view para eliminar antecedentes medicos
    """
    def delete(self,request,pk):
        antecedente_medico = Antecedente_Medico.objects.get(id=pk)
        antecedente_medico.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)    
    
#VIEW DE PATOLOGIAS

class PatologiaListado(APIView):
    """
        view para listar las patologias de alumnos
    
    """
    def get(self, request):
        patologia = Patologia.objects.all().order_by('id');
        serializer = PatologiaAlumnoSerializer(patologia, many = True)
        return Response(serializer.data)

class PatologiaBuscarPorId(APIView):
    """
        view de busqueda por id de patologias para mostrar en los input
    
    """
    def get(self,request,pk):
        patologia = Patologia.objects.filter(id=pk)
        serializer = PatologiaSerializer(patologia, many = True)
        return Response(serializer.data)

class PatologiaRegistrar(APIView):
    """
        view para registrar patologias
    """
    def post(self,request):
        serializer = PatologiaSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    
class PatologiaEditar(APIView):
    """
        views para editar patologias
    """
    def put(self,request,pk):
        patologia = Patologia.objects.get(id=pk)
        serializer = PatologiaSerializer(patologia, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

class PatologiaEliminar(APIView):
    """
        view para eliminar patologias
    """
    def delete(self,request,pk):
        patologia = Patologia.objects.get(id=pk)
        patologia.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)

#VIEW DE ACTA COMPROMISO

class ActaCompromisoListado(APIView):
    """
        view para listar las acta compromiso
    
    """
    def get(self, request):
        acta_compromiso = Acta_Compromiso.objects.all().order_by('id');
        serializer = Acta_CompromisoAlumnoSerializer(acta_compromiso, many = True)
        return Response(serializer.data)

class ActaCompromisoBuscarPorId(APIView):
    """
        view de busqueda por id de acta compromiso para mostrar en los input
    """
    def get(self,request,pk):
        acta_compromiso = Acta_Compromiso.objects.filter(id=pk)
        serializer = Acta_CompromisoSerializer(acta_compromiso, many = True)
        return Response(serializer.data)

class ActaCompromisoRegistrar(APIView):
    """
        view para registrar actas compromiso
    """
    def post(self,request):
        serializer = Acta_CompromisoSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

class ActaCompromisoEditar(APIView):
    """
        view para editar acta compromiso
    """
    def put(self,request,pk):
        acta_compromiso = Acta_Compromiso.objects.get(id=pk)
        serializer = Acta_CompromisoSerializer(acta_compromiso , data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

class ActaCompromisoEliminar(APIView):
    """
        view para eliminar acta compromiso
    """
    def delete(self,request, pk):
        acta_compromiso = Acta_Compromiso.objects.get(id=pk)
        acta_compromiso.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
#VIEW DE  ENFERMERIA

class EnfermeriaListado(APIView):
    """
        view efermeria con los alumnos asociados
    
    """
    def get(self, request):
        enfermeria = Enfermeria.objects.all().order_by('id')
        serializer = EnfermeriaAlumnoSerializer(enfermeria, many = True)
        return Response(serializer.data)
    
class EnfermeriaBuscarPorId(APIView):
    """
        view de buscaqueda por id de enfermeria para mostrar en los input
    
    """
    def get(self,request,pk):
        enfermeria = Enfermeria.objects.filter(id=pk);
        serializer = EnfermeriaSerializer(enfermeria, many=True)
        return Response(serializer.data)
    
class EnfermeriaRegistrar(APIView):
    """
        view para registrar enfermeria
    """
    def post(self, request):
        serializer = EnfermeriaSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

class EnfermeriaEditar(APIView):
    """
        view para editar enfermeria
    """
    def put(self,request,pk):
        enfermeria = Enfermeria.objects.get(id=pk)
        serializer = EnfermeriaSerializer(enfermeria, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

class EnfermeriaEliminar(APIView):
    """
        view para eliminar enfermeria
    """
    def delete(self,request,pk):
        enfermeria = Enfermeria.objects.get(id=pk)
        enfermeria.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
    
class BucarAlumnoPorNombre(APIView):
   """ view de buscar alumno por nombre"""
   def get(self, request,nombre_alumno):
       alumno = Alumno.objects.filter(nombre_alumno__icontains=nombre_alumno)
       serializer = AlumnoSerializer(alumno, many = True);
       return Response(serializer.data)
   
class BucarAlumnoPorNombreActaCompromiso(APIView):
       """ view de buscar alumno por nombre"""
       def get(self,request,nombre_alumno):
         alumno = Alumno.objects.filter(nombre_alumno__icontains=nombre_alumno)
         acta_compromiso = Acta_Compromiso.objects.filter(alumno__in = alumno)
         serializer = Acta_CompromisoAlumnoSerializer(acta_compromiso, many = True);
         return Response(serializer.data)
    
    
    
