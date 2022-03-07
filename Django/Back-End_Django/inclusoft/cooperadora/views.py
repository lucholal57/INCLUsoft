from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .models import Cooperadora
from .serializers import CooperadoraSerializer
# Create your views here.

#View de Cooperadora
@api_view(['GET', 'PUT'])
@permission_classes((IsAuthenticated, ))
def CooperadoraView(request,pk=None):
    
    #List
    if request.method == 'GET':
        cooperadora = Cooperadora.objects.all()
        serializer = CooperadoraSerializer(cooperadora, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    # Create
    elif request.method == 'PUT':
        cooperadora_agregar = Cooperadora.objects.filter(id=pk).first()
        serializer = CooperadoraSerializer(cooperadora_agregar,data=request.data)
        if serializer.is_valid():
            print(cooperadora_agregar)
            print(serializer.data['caja_chica'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
def CooperadoraEditar(request,pk=None):
    if request.method == 'PUT':
        cooperadora_edicion = Cooperadora.objects.filter(id=pk).first()
        serializer = CooperadoraSerializer(cooperadora_edicion, data=request.data)
        if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
#Put para actualizar el valor al ingresar dinero         
@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
def CooperadoraAgregarDinero(request,pk=None):
    if request.method == 'PUT':
        cooperadora_agregar = Cooperadora.objects.filter(id=pk).first()
        serializer = CooperadoraSerializer(cooperadora_agregar,data=request.data)
        if serializer.is_valid():
            print(cooperadora_agregar)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)