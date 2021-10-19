from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import (Personal, Permiso_Salida, Evaluacion_Laboral, Asistencia_Personal, Entrega_Proyecto)
from .serializers import (Asistencia_PersonalPersonalSerializer, Asistencia_PersonalSerializer, Entrega_ProyectoPersonalSerializer, Entrega_ProyectoSerializer, Evaluacion_LabolarPersonalSerializer, Evaluacion_LaboralSerializer, Permiso_SalidaPersonalSerializer, Permiso_SalidaSerializer, PersonalSerializer)

# Create your views here.
#VIEW DE PERSONAL

class PersonalListado(APIView):
    """
        view de listado de todo el personal
    """
    def get(self,request):
        personal = Personal.objects.all().order_by('id')
        serializer = PersonalSerializer(personal, many=True)
        return Response(serializer.data)

class PersonalBuscarPorId(APIView):
    """
        view de buscar personal por ID
    """
    def get(self,request,pk):
        personal = Personal.objects.filter(id=pk)
        serializer = PersonalSerializer(personal, many=True)
        return Response(serializer.data)
    
class PersonalRegistrar(APIView):
    """
        view para registrar personal
    """
    def post(self, request):
        serializer = PersonalSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class PersonalEditar(APIView):
    """
        view para editar un personal
    """
    def put(self,request,pk):
        personal = Personal.objects.get(id=pk)
        serializer = PersonalSerializer(personal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

class PersonalEliminar(APIView):
    """
        view para eliminar un personal
    """
    def delete(self,request,pk):
        personal = Personal.objects.get(id=pk)
        personal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#VIEW DE ASISTENCIA PERSONAL

class AsistenciaPersonalListado(APIView):
    """
        View para listar las asistencias del personal
    """
    def get(self, request):
        asistencia_personal = Asistencia_Personal.objects.all().order_by('id')
        serializer = Asistencia_PersonalPersonalSerializer(asistencia_personal, many = True)
        return Response(serializer.data)

class AsistenciaPersonalBuscarPorId(APIView):
    """
        view de busqueda por id de asistencias personal para mostrar en los input
    """
    def get(self, request, pk):
        asistencia_personal = Asistencia_Personal.objects.filter(id=pk)
        serializer = Asistencia_PersonalSerializer(asistencia_personal, many=True)
        return Response(serializer.data)
    
class AsistenciaPersonalRegistrar(APIView):
    """
        view para registrar asistencia personal
    """
    def post(self,request):
        asistencia_personal = Asistencia_Personal.objects.all()
        serializer = Asistencia_PersonalSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

class AsistenciaPersonalEditar(APIView):
    """
        view para editar asistencia personal
    """
    def put(self,request,pk):
        asistencia_personal = Asistencia_Personal.objects.get(id=pk)
        serializer = Asistencia_PersonalSerializer(asistencia_personal, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

class AsitenciaPersonalEliminar(APIView):
    """
        view para eliminar asistencia personal
    """
    def delete(self,request, pk):
        asistencia_personal = Asistencia_Personal.objects.get(id=pk)
        asistencia_personal.delete();
        return Response(status = status.HTTP_204_NO_CONTENT)

# VIEW DE PERMISOS SALIDAS PERSONAL

class PermisoSalidaListado(APIView):
    """
        view para listar los permisos de salidas del personal
    """        
    def get(self,request):
        permiso_salida = Permiso_Salida.objects.all().order_by('id')
        serializer = Permiso_SalidaPersonalSerializer(permiso_salida, many=True)
        return Response(serializer.data)
    
class PermisoSalidaBuscarPorId(APIView):
    """
        view de busqueda por id de permisos de salida para mostrar en los input
    """
    def get(self,request,pk):
        permiso_salida = Permiso_Salida.objects.filter(id=pk)
        serializer = Permiso_SalidaSerializer(permiso_salida, many=True)
        return Response(serializer.data)
    
class PermisoSalidaRegistrar(APIView):
    """p
        view para registrar permisos de salidas personal
    """
    def post(self,request):
        permiso_salida = Permiso_Salida.objects.all()
        serializer = Permiso_SalidaSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class PermisoSalidaEditar(APIView):
    """
        view para editar permisos de salida
    """
    def put(self,request,pk):
        permiso_salida = Permiso_Salida.objects.get(id=pk)
        serializer = Permiso_SalidaSerializer(permiso_salida, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class PermisoSalidaEliminar(APIView):
    """
        view para eliminar permisos de salida
    """
    def delete(self,request,pk):
        permiso_salida = Permiso_Salida.objects.get(id=pk)
        permiso_salida.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# VIEW DE EVALUACION PERSONAL

class EvaluacionLaboralListado(APIView):
    """
        view para listar las evaluaciones laborales con respecto a un personal
    """
    def get(self,request):
        evaluacion_laboral = Evaluacion_Laboral.objects.all().order_by('id');
        serializer = Evaluacion_LabolarPersonalSerializer(evaluacion_laboral, many = True)
        return Response(serializer.data)
    
class EvaluacionLaboralBuscarPorId(APIView):
    """
        view de busqueda por id de evaluaciones laborales para mostrar en los input
    """
    def get(self,request,pk):
        evaluacion_laboral = Evaluacion_Laboral.objects.filter(id=pk)
        serializer = Evaluacion_LaboralSerializer(evaluacion_laboral, many = True)
        return Response(serializer.data)
    
class EvaluacionLaboralRegistrar(APIView):
    """
        view para registrar evaluaciones laborales de un personal
    """
    def post(self, request):
        evaluacion_laboral = Evaluacion_Laboral.objects.all();
        serializer = Evaluacion_LaboralSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    
class EvaluacionLaboralEditar(APIView):
    """
        view para editar evaluacion laboral
    """
    def put(self, request,pk):
        evaluacion_laboral = Evaluacion_Laboral.objects.get(id=pk)
        serializer = Evaluacion_LaboralSerializer(evaluacion_laboral, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class EvaluacionLaboralEliminar(APIView):
    """
        view para eliminar evaluaciones laborales
    """
    def delete(self, request,pk):
        evaluacion_laboral = Evaluacion_Laboral.objects.get(id=pk)
        evaluacion_laboral.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)

# VIEW DE ENTREGA PROYECTOS 

class EntregaProyectosListado(APIView):
    """
        view para listar entrega de proyectos 
    """
    def get(self, request):
        entrega_proyecto = Entrega_Proyecto.objects.all().order_by('id')
        serializer = Entrega_ProyectoPersonalSerializer( entrega_proyecto, many = True)
        return Response(serializer.data)
    
class EntregaProyectoBuscarPorId(APIView):
    """
        view de busqueda por id de entrega proyectos para mostrar en los input
    """
    def get(self, request,pk):
        entrega_proyecto = Entrega_Proyecto.objects.filter(id=pk)
        serializer = Entrega_ProyectoSerializer(entrega_proyecto , many = True)
        return Response(serializer.data)
    
class EntregaProyectoRegistrar(APIView):
    """
        view para registrar entregas de proyectos
    """
    def post(self, request):
        entrega_proyecto = Entrega_Proyecto.objects.all()
        serializer = Entrega_ProyectoSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class EntregaProyectoEditar(APIView):
    """
        view para editar las entrega de proyectos
    """
    def put(self,request,pk):
        entrega_proyecto = Entrega_Proyecto.objects.get(id=pk)
        serializer = Entrega_ProyectoSerializer(entrega_proyecto, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class EntregaProyectoEliminar(APIView):
    """
        view para eliminar entregas de proyectos
    """
    def delete(self,request,pk):
        entrega_proyecto = Entrega_Proyecto.objects.get(id=pk)
        entrega_proyecto.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)