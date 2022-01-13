from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from acompañantes.models import Acompañante
from acompañantes.serializers import AcompañanteSerializer, AcompañantePostPutSerializer
from alumno.models import Alumno
from personal.models import Personal

# Create your views here.


@api_view(['GET', 'POST'])
def AcompañanteListado(request):
    
    # List
    if request.method == 'GET':
        # Queryset
        acompañante = Acompañante.objects.all().order_by('id')
        serializer = AcompañanteSerializer(acompañante, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)

    # Create
    elif request.method == 'POST':
        serializer = AcompañantePostPutSerializer(data=request.data)
        
        # Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def AcompañanteBuscarPorId(request, pk=None):
    # Consulta para obtener el listado en el modal sin FILTER
    acompañante = Acompañante.objects.filter(id=pk)
    
    # Validacion
    if acompañante:
        
        # Queryset
        if request.method == 'GET':
            serializer = AcompañantePostPutSerializer(acompañante, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Update
        elif request.method == 'PUT':
             # Consulta para editar el contenido del modal con FILTER
            acompañante_edicion = Acompañante.objects.filter(id=pk).first()
            serializer = AcompañantePostPutSerializer(acompañante_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    
        # Delete 
        elif request.method == 'DELETE':
            acompañante.delete()
            return Response({'message':'Usuario eliminado correctamente!'}, status=status.HTTP_200_OK)

    # Validacion no se encontro   
    return Response({'message':'No se ha encontrado un usuario con estos datos'},status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def BusquedaAlumno(request, nombre_alumno):
    alumno = Alumno.objects.filter(nombre_alumno__icontains = nombre_alumno)
    acompanante = Acompañante.objects.filter(alumno__in = alumno)
    serializer = AcompañanteSerializer(acompanante, many=True)
    return Response(serializer.data)            

@api_view(['GET'])
def BusquedaPersonal(request, nombre_personal):
    personal = Personal.objects.filter(nombre_personal__icontains = nombre_personal)
    acompanante = Acompañante.objects.filter(personal__in = personal)
    serializer = AcompañanteSerializer(acompanante, many=True)
    return Response(serializer.data)