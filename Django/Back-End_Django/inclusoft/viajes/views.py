from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from viajes.models import Viaje
from viajes.serializers import ViajeSerializer, ViajePostPutSerializer
from alumno.models import Alumno
from personal.models import Personal


# Create your views here.
@api_view(['GET','POST'])
def ViajeListado(request, *args, **kwargs):
    # List
    if request.method == 'GET':
        #Queryset
        viaje = Viaje.objects.all().order_by('id')
        serializer = ViajeSerializer(viaje, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    # Create
    elif request.method == 'POST':
        serializer = ViajePostPutSerializer(data=request.data)
        
        #Validacion
        if serializer.is_valid():
            
            nuevo_viaje = Viaje.objects.create(**serializer.validated_data)
            nuevo_viaje.alumno.set(request.data.get('alumno'))
            nuevo_viaje.personal.set(request.data.get('personal'))
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET', 'PUT' , 'DELETE'])
def ViajeBuscarPorId(request, pk=None):
    # Consulta para obtener el listado en el modal sin Filter
    viaje = Viaje.objects.filter(id=pk)
    
    # Validacion
    if viaje:
        
        #Queryset
        if request.method == 'GET':
            serializer  = ViajePostPutSerializer(viaje, many=True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            # Consulta para editar el contenido del modal con filter
            viaje_edicion = Viaje.objects.filter(id=pk).first()
            serializer = ViajePostPutSerializer(instance=viaje_edicion, data=request.data)
            if serializer.is_valid():
                viaje_actualizado = serializer.save()
                
                viaje_actualizado.alumno.set(request.data.get('alumno'))
                viaje_actualizado.personal.set(request.data.get('personal'))
                return Response(serializer.data, status = status.HTTP_200_OK)
            else:
                return Response(serializer.data, status = status.HTTP_400_BAD_REQUEST)
        
        # Delete
        elif request.method == 'DELETE':
            viaje.delete();
            return Response({'message':'Viaje eliminado correctamente!'}, status=status.HTTP_200_OK)
        
@api_view(['GET'])
def BuscarViajePorDestino(request,destino):
    """ View para busqueda de viajes por destino"""
    viaje = Viaje.objects.filter(destino__icontains=destino)
    serializer = ViajeSerializer(viaje, many=True)
    return Response(serializer.data, status = status.HTTP_200_OK)
