from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from alumno.models import Alumno
from .models import (Socio, Libro, PrestamoLibro, DevolucionLibro)
from .serializers import (SocioSerializer, SocioPostPutSerializer, LibroSerializer, PrestamoLibroSerializer,
                          PrestamoLibroPostPutSerializer, DevolucionLibroSerializer, DevolucionLibroPostPutSerializer)

# Create your views here.

# VIEW DE Socios


@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated, ))
def SocioListado(request):
    # List
    if request.method == 'GET':
        socio = Socio.objects.all().order_by('id')
        serializer = SocioSerializer(socio, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    # Create
    elif request.method == 'POST':
        serializer = SocioPostPutSerializer(data=request.data)
        # Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Busqueda por id para la edicion y eliminacion


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated, ))
def SocioBuscarPorId(request, pk=None):
    # Consulta para obtener el listado en el modal sin First
    socio = Socio.objects.filter(id=pk)
    # Validacion
    if socio:
        # Queryset
        if request.method == 'GET':
            serializer = SocioPostPutSerializer(socio, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # Update
        elif request.method == 'PUT':
            # Consulta para editar el contenido del modal con First
            socio_edicion = Socio.objects.filter(id=pk).first()
            serializer = SocioPostPutSerializer(socio_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # DELETE
        elif request.method == 'DELETE':
            socio.delete()
            return Response({'message': 'Socio eliminado correctamente!'}, status=status.HTTP_200_OK)
    # Validacion no se encontro
    return Response({'message': 'No se ha encontrado un socio con estos datos'}, status=status.HTTP_400_BAD_REQUEST)
# Busqueda de socios por nombre


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def BusquedaSocio(request, nombre_alumno):
    alumno = Alumno.objects.filter(nombre_alumno__icontains=nombre_alumno)
    socio = Socio.objects.filter(alumno__in=alumno)
    serializer = SocioSerializer(socio, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# VIEW DE LIBROS
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated, ))
def LibroListado(request):
    # List
    if request.method == 'GET':
        libro = Libro.objects.all().order_by('id')
        serializer = LibroSerializer(libro, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    # Create
    elif request.method == 'POST':
        serializer = LibroSerializer(data=request.data)
        # Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Buscar por id para la edicion y eliminacion en modal


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated, ))
def LibroBuscarPorId(request, pk=None):
    # Consulta para obtener el listado en el modal sin First
    libro = Libro.objects.filter(id=pk)
    # Validacion
    if libro:
        # Queryset
        if request.method == 'GET':
            serializer = LibroSerializer(libro, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # Update
        elif request.method == 'PUT':
            # Consulta para obtener el listado en el modal sin first
            libro_edicion = Libro.objects.filter(id=pk).first()
            serializer = LibroSerializer(libro_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # DElete
        elif request.method == 'DELETE':
            libro.delete()
            return Response({'message': 'Libro eliminado correctamente!'}, status=status.HTTP_200_OK)
    # Validacion no se encontro
    return Response({'message': 'No se ha encontrado un alumno con estos datos'}, status=status.HTTP_400_BAD_REQUEST)

# Busqueda de Libro por nombre
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def BusquedaLibro(request, nombre_libro):
    libro = Libro.objects.filter(titulo__icontains=nombre_libro)
    serializer = LibroSerializer(libro, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# VIEW DE PRESTAMOS


@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated, ))
def PrestamoListado(request):
    # List
    if request.method == 'GET':
        # Queryset
        prestamo = PrestamoLibro.objects.all().order_by('id')
        serializer = PrestamoLibroSerializer(prestamo, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    # Create
    elif request.method == 'POST':
        serializer = PrestamoLibroPostPutSerializer(data=request.data)
        # Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Busqueda por id para la edicion y eliminacion


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated, ))
def PrestamoBuscarPorId(request, pk=None):
    # Consulta para obtener el listado en el modal sin first
    prestamo = PrestamoLibro.objects.filter(id=pk)
    # Validacion
    if prestamo:
        # Queryset
        if request.method == 'GET':
            serializer = PrestamoLibroPostPutSerializer(prestamo, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # Update
        elif request.method == 'PUT':
            # Consulta para editar el contenido del modal con first
            prestamo = PrestamoLibro.objects.filter(id=pk).first()
            serializer = PrestamoLibroPostPutSerializer(
                prestamo, data=request.data)
            # Validacion
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Delete
        elif request.method == 'DELETE':
            prestamo.delete()
            return Response({'message': 'Prestamo eliminado correctamente!'}, status=status.HTTP_200_OK)
    # Validacion no se encontro
    return Response({'message': 'No se ha encontrado un prestamo con estos datos'}, status=status.HTTP_400_BAD_REQUEST)

# Busqueda de socios por nombre


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def BusquedaSocioPrestamo(request, nombre_alumno):
    socio = Socio.objects.filter(alumno__nombre_alumno__icontains=nombre_alumno)
    prestamo = PrestamoLibro.objects.filter(socio__in=socio)
    serializer = PrestamoLibroSerializer(prestamo, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# VIEW DE DEVOLUCION


@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated, ))
def DevolucionListado(request):
    # list
    if request.method == 'GET':
        devolucion = DevolucionLibro.objects.all().order_by('id')
        serializer = DevolucionLibroSerializer(devolucion, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    # Create
    elif request.method == 'POST':
        serializer = DevolucionLibro(data=request.data)
        # Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Busqueda por id para la edicion y eliminacion


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated, ))
def DevolucionBuscarPorId(request, pk=None):
    # Consulta para obtener el listado en el modal sin first
    devolucion = DevolucionLibro.objects.filter(id=pk)
    # Validacion
    if devolucion:
        # Queryset
        if request.method == 'GET':
            serializer = DevolucionLibroPostPutSerializer(
                devolucion, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # Update
        elif request.method == 'PUT':
            # Consulta para obtener el listado en el modal con first
            devolucion_edicion = DevolucionLibro.objects.filter(id=pk).first()
            serializer = DevolucionLibroPostPutSerializer(devolucion_edicion, data=request.data)
            #Validacion
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        #Delete
        elif request.method == 'DELETE':
            devolucion.delete()
            return Response({'message':'Devolucion eliminada correctamente!'}, status=status.HTTP_200_OK) 
    # Validacion no se encontro   
    return Response({'message':'No se ha encontrado una devolucion con estos datos'},status=status.HTTP_400_BAD_REQUEST) 

#Busqueda de fecha de una devolucion
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def BusquedaDevolucion(request,fecha_de_devolucion):
    devolucion = DevolucionLibro.objects.filter(fecha_de_devolucion__icontains=fecha_de_devolucion)
    serializer = DevolucionLibroSerializer(devolucion)
    return Response(serializer.data, status=status.HTTP_200_OK)  