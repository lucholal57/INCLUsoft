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
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def CooperadoraView(request):
    
    #List
    if request.method == 'GET':
        cooperadora = Cooperadora.objects.all()
        serializer = CooperadoraSerializer(cooperadora, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
def CooperadoraEditar(request,pk=None):
    if request.method == 'PUT':
        cooperadore_edicion = Cooperadora.objects.filter(id=pk).first()
        serializer = CooperadoraSerializer(cooperadore_edicion, data=request.data)
        if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
