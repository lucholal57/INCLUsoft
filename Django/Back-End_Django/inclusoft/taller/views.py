from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import (Taller, Informe_Cuatrimestral, Materiales_Taller, Ventas_Taller, Produccion_Taller, Compras_Taller, Inventario_Taller)
from .serializers import (Informe_CuatrimestralSerializer, Informe_CuatrimestralTallerSerializer, Materiales_TallerSerializer, Materiales_TallerTallerSerializer, TallerSerializer, Informe_CuatrimestralTallerSerializer, Ventas_TallerSerializer, Ventas_TallerTallerSerializer )


# Create your views here.
#VIEW DE TALLER

class TallerListado(APIView):
    """ Listado Taller """
    def get(self):
        taller = Taller.objects.all().order_by('id')
        serializer = TallerSerializer(taller, many=True)
        return Response(serializer.data)
    
class TallerBuscarPorId(APIView):
    """ view de busqueda de taller por ID"""
    def get(self,pk):
        taller = Taller.objects.filter(id=pk)
        serializer = TallerSerializer(taller, many=True)
        return Response(serializer.data)
    
class TallerRegistrar(APIView):
    """ view para registrar taller"""
    def post(self, request):
        serializer = TallerSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

class TallerEditar(APIView):
    """ view para editar un taller """
    def put(self,request,pk):
        taller = Taller.objects.get(id=pk)
        serializer = TallerSerializer(taller, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class TallerEliminar(APIView):
    """ view para eliminar taller """
    def delete(self,pk):
        taller = Taller.objects.get(id=pk)
        taller.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)    
    
#VIEW DE INFORMES CUATRIMESTRALES

class InformeCuatrimestralListado(APIView):
    """ view para listar informes cuatrimetrales"""
    def get(self):
        informe_cuatrimestral = Informe_Cuatrimestral.objects.all().order_by('id')
        serializer = Informe_CuatrimestralTallerSerializer(informe_cuatrimestral, many = True)
        return Response(serializer.data)
    
class InformeCuatrimestralBuscarPorId(APIView):
    """ view para buscar informes cuatrimestrales por id"""
    def get(self,pk):
        informe_cuatrimestral = Informe_Cuatrimestral.objects.filter(id=pk)
        serializer = Informe_CuatrimestralSerializer(informe_cuatrimestral, many = True)
        return Response(serializer.data)


class InformeCuatrimestralRegistrar(APIView):
    """ view para registrar informe cuatrimestral"""
    def post(self,request):
        informe_cuatrimestral = Informe_Cuatrimestral.objects.all()
        serializer = Informe_CuatrimestralSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)        
        
class InformeCuatrimestralEditar(APIView):
    """ view para editar informes cuatrimestrales"""
    def put(self,request,pk):
        informe_cuatrimestral = Informe_Cuatrimestral.objects.get(id=pk)
        serializer = Informe_CuatrimestralSerializer(informe_cuatrimestral, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    
class InformeCuatrimestralEliminar(APIView):
    """ view para eliminar informes cuatrimestrales"""
    def delete(self,pk):
        informe_cuatrimestral = Informe_Cuatrimestral.objects.get(id=pk)
        informe_cuatrimestral.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
    

# VIEW DE MATERIALES DE TALLER

class MaterialesTallerListado(APIView):
    """ view para listar materiales de talller """
    def get(self):
        materiales_taller = Materiales_Taller.objects.all().order_by('id')
        serializer = Materiales_TallerTallerSerializer(materiales_taller, many=True)
        return Response(serializer.data)
    
class MaterialesTallerBuscarPorId(APIView):
    """ view para buscar materiales de taller por id"""
    def get(self,pk):
        materiales_taller = Materiales_Taller.objects.filter(id=pk)
        serializer = Materiales_TallerSerializer(materiales_taller, many = True)
        return Response(serializer.data)
    
class MaterialesTallerRegistrar(APIView):
    """ view para registrar materiales de taller"""
    def post(self, request):
        materiales_taller = Materiales_Taller.objects.all() 
        serializer = Materiales_TallerSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors) 
    
class MaterialesTallerEditar(APIView):
    """ view para editar materiales de taller"""
    def put(self, request ,pk):
        materiales_taller = Materiales_Taller.objects.get(id=pk)
        serializer = Materiales_TallerSerializer(materiales_taller, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class MaterialesTallerEliminar(APIView):
    """ view para eliminar materiales de taller"""
    def delete(self,pk):
        materiales_taller = Materiales_Taller.objects.get(id=pk)
        materiales_taller.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
    
# VIEW DE VENTAS DE TALLER

class VentasTallerListado(APIView):
    """ view para el listado de ventas del taller"""
    def get(self):
        ventas_taller = Ventas_Taller.objects.all.order_by('id')
        serializer = Ventas_TallerTallerSerializer   (ventas_taller , many = True)
        return Response(serializer.data)
    
class VentasTallerBuscarPorId(APIView):
    """ view para buscar por id ventas de talleres"""
    def get(self,pk):
        ventas_taller = Ventas_Taller.objects.filter(id=pk)
        serializer = Ventas_TallerSerializer (ventas_taller , many = True)  
        return Response(serializer.data)
    
class VentasTallerRegistrar(APIView):
    """ view de registro de ventas taller"""
