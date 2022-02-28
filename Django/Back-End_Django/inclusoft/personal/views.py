from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import (Personal, Permiso_Salida, Evaluacion_Laboral, Asistencia_Personal, Entrega_Proyecto)
from .serializers import (AsistenciaSerializer, AsistenciaPostPutSerializer, Entrega_ProyectoSerializer, Entrega_ProyectoPostPutSerializer, Evaluacion_LaboralSerializer, Evaluacion_LaboralPostPutSerializer, Permiso_SalidaSerializer, Permiso_SalidaPostPutSerializer, PersonalSerializer)

# Create your views here.
#VIEW DE PERSONAL
#Listado y Creacion
@api_view(['GET', 'POST'])
def PersonalListado(request):
    
    #List
    if request.method == 'GET':
        #Queryset
        personal = Personal.objects.all().order_by('id')
        serializer = PersonalSerializer(personal , many = True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    #Create
    elif request.method == 'POST':
        serializer = PersonalSerializer(data= request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#Busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def PersonalBuscarPorId(request, pk=None):
    #consulta par obtener el listado en el modal sin First
    personal = Personal.objects.filter(id=pk)
    
    # Validacion
    if personal:
        #Queryset
        if request.method == 'GET':
            serializer = PersonalSerializer(personal, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            #Consulta para editar el contenido del modal con First
            personal_edicion = Personal.objects.filter(id=pk).first()
            serializer = PersonalSerializer(personal_edicion,data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    
        #Delete
        elif request.method == 'DELETE':
            personal.delete()
            return Response({'message':'Personal eliminado correctamente!'}, status=status.HTTP_200_OK)
        
# Validacion no se encontro   
    return Response({'message':'No se ha encontrado un personal con estos datos'},status=status.HTTP_400_BAD_REQUEST)

#Busqueda de personal 
@api_view(['GET'])
def BusquedaPersonal(request, nombre_personal):
    personal = Personal.objects.filter(nombre_personal__icontains = nombre_personal)
    serializer = PersonalSerializer(personal, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK) 
        

#VIEW DE ASISTENCIA PERSONAL
#Listado y Creacion
@api_view(['GET', 'POST'])
def AsistenciaListado(request):
    
    #List
    if request.method == 'GET':
        #Queryset
        asistencia = Asistencia_Personal.objects.order_by('id')
        serializer = AsistenciaSerializer(asistencia, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    #create
    elif request.method == 'POST':
        serializer = AsistenciaPostPutSerializer(data=request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# Busqueda pore id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def AsistenciaBuscarPorId(request, pk=None):
    #Consulta para obtener el listado en el modal sin First
    asistencia = Asistencia_Personal.objects.filter(id=pk)
    
    #Validacion
    if asistencia:
        #Queryset
        if request.method == 'GET':
            serializer = AsistenciaPostPutSerializer(asistencia, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            #Consulta para editar el contenido del modal con First
            asistencia_edicion = Asistencia_Personal.objects.filter(id=pk).first()
            serializer = AsistenciaPostPutSerializer(asistencia_edicion,data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        #Delete
        asistencia.delete()
        return Response({'message':'Asistencia eliminado correctamente!'}, status=status.HTTP_200_OK)

# Validacion no se encontro   
    return Response({'message':'No se ha encontrado una asistencia con estos datos'},status=status.HTTP_400_BAD_REQUEST)

# Busqueda de personal en listado de asistencias por nombre
@api_view(['GET'])
def BusquedaAsistenciaPersonal(request, nombre_personal):
    personal = Personal.objects.filter(nombre_personal__icontains = nombre_personal)
    asistencia = Asistencia_Personal.objects.filter(personal__in = personal)
    serializer = AsistenciaSerializer(asistencia, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK) 

# Busqueda de personal en listado de asistencias por id para estadistica
@api_view(['GET'])
def BusquedaAsistenciaPersonalEstadistica(request,pk=None):
    personal = Personal.objects.filter(id=pk)
    asistencia = Asistencia_Personal.objects.filter(personal__in = personal)
    serializer = AsistenciaSerializer(asistencia, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK) 

# Busqueda de personal en listado de asistencias por id para validar permiso de salida
@api_view(['GET'])
def BusquedaAsistenciaPersonalPermisoSalida(request,pk=None):
    personal = Personal.objects.filter(id=pk)
    asistencia = Asistencia_Personal.objects.filter(personal__in = personal).filter(estado__icontains="Presente")
    serializer = AsistenciaSerializer(asistencia, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK) 

# VIEW DE PERMISOS SALIDAS PERSONAL
#Listado y Creacion
@api_view(['GET', 'POST'])
def PermisoSalidaListado(request):
    
    #List
    if request.method == 'GET':
        #Queryset
        permiso_salida = Permiso_Salida.objects.all().order_by('id')
        serializer = Permiso_SalidaSerializer(permiso_salida, many = True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    #Create
    elif request.method == 'POST':
        serializer = Permiso_SalidaPostPutSerializer(data = request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# Busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def PermisoSalidaBuscarPorId(request, pk=None):
    # Consulta para obtener el listado en el modal sin First
    permiso_salida = Permiso_Salida.objects.filter(id=pk)
    
    #Validacion
    if permiso_salida:
        #Queryset
        if request.method == 'GET':
            serializer = Permiso_SalidaPostPutSerializer(permiso_salida, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            #Consulta para editar el contenido del modal con First
            permiso_salida_edicion = Permiso_Salida.objects.filter(id=pk).first()
            serializer = Permiso_SalidaPostPutSerializer(permiso_salida_edicion, data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        #Delete
        elif request.method == 'DELETE':
                permiso_salida.delete()
                return Response({'message':'Permiso de salida eliminado correctamente!'}, status=status.HTTP_200_OK)
            
# Validacion no se encontro   
    return Response({'message':'No se ha encontrado un permiso de salida con estos datos'},status=status.HTTP_400_BAD_REQUEST)

# Busqueda de personal en listado de permisos de salida por nombre
@api_view(['GET'])
def BusquedaPermisoSalidaPersonal(request, nombre_personal):
    personal = Personal.objects.filter(nombre_personal__icontains = nombre_personal)
    permiso_salida = Permiso_Salida.objects.filter(personal__in = personal)
    serializer = Permiso_SalidaSerializer(permiso_salida, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK) 
                
# VIEW DE EVALUACION PERSONAL
#Listado y Creacion
@api_view(['GET', 'POST'])
def EvaluacionLaboralListado(request):
    
    #List
    if request.method == 'GET':
        #Queryset
        evaluacion_laboral = Evaluacion_Laboral.objects.all().order_by('id')
        serializer = Evaluacion_LaboralSerializer(evaluacion_laboral, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    #Create
    elif request.method == 'POST':
        serializer = Evaluacion_LaboralPostPutSerializer(data= request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def EvaluacionLaboralBuscarPorId(request, pk=None):
    #Consulta para obtener el listado en el modal sin First
    evaluacion_laboral = Evaluacion_Laboral.objects.filter(id=pk)
    
    #Validacion
    if evaluacion_laboral:
        #Queryset
        if request.method == 'GET':
            serializer = Evaluacion_LaboralPostPutSerializer(evaluacion_laboral, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            #Consulta para editar el contenido del modal con First
            evaluacion_laboral_edicion = Evaluacion_Laboral.objects.filter(id=pk).first()
            serializer = Evaluacion_LaboralPostPutSerializer(evaluacion_laboral_edicion, data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        #Delete
        elif request.method == 'DELETE':
            evaluacion_laboral.delete()
            return Response({'message':'Evaluacion laboral eliminada correctamente!'}, status=status.HTTP_200_OK)
        
# Validacion no se encontro   
    return Response({'message':'No se ha encontrado una evaluacion laboral con estos datos'},status=status.HTTP_400_BAD_REQUEST)

# Busqueda de personal en listado de evaluacion laboral  por nombre
@api_view(['GET'])
def BusquedaEvaluacionLaboralPersonal(request, nombre_personal):
    personal = Personal.objects.filter(nombre_personal__icontains = nombre_personal)
    evaluacion_laboral = Evaluacion_Laboral.objects.filter(personal__in = personal)
    serializer = Evaluacion_LaboralSerializer(evaluacion_laboral, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK) 

# VIEW DE ENTREGA PROYECTOS 
#Listado y Creacion
@api_view(['GET', 'POST'])
def EntregaProyectoListado(request):
    
    #List
    if request.method == 'GET':
        #Queryset
        entrega_proyecto = Entrega_Proyecto.objects.all().order_by('id')
        serializer = Entrega_ProyectoSerializer(entrega_proyecto, many = True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    #Create
    elif request.method == 'POST':
        serializer = Entrega_ProyectoPostPutSerializer(data= request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#Busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def EntregaProyectoBuscarPorId(request, pk=None):
    #Consulta para obtener el listado en el modal sin First
    entrega_proyecto = Entrega_Proyecto.objects.filter(id=pk)
    
    #Validacion
    if entrega_proyecto:
        #Queryset
        if request.method == 'GET':
            serializer = Entrega_ProyectoPostPutSerializer(entrega_proyecto, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            #Consulta para editar el contenido del modal con First
            entrega_proyecto_edicion = Entrega_Proyecto.objects.filter(id=pk).first()
            serializer = Entrega_ProyectoPostPutSerializer(entrega_proyecto_edicion, data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        #Delete
        elif request.method == 'DELETE':
            entrega_proyecto.delete()
            return Response({'message':'Entrega Proyecto eliminado correctamente!'}, status=status.HTTP_200_OK)
        
# Validacion no se encontro   
    return Response({'message':'No se ha encontrado un acompañante con estos datos'},status=status.HTTP_400_BAD_REQUEST)

# Busqueda de personal en listado de entregas proyecto  por nombre
@api_view(['GET'])
def BusquedaEntregaProyectoPersonal(request, nombre_personal):
    personal = Personal.objects.filter(nombre_personal__icontains = nombre_personal)
    entrega_proyecto = Entrega_Proyecto.objects.filter(personal__in = personal)
    serializer = Entrega_ProyectoSerializer(entrega_proyecto, many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK) 

