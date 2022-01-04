from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import status
from .models import (Taller, Informe_Cuatrimestral, Materiales_Taller,
                     Ventas_Taller, Produccion_Taller, Compras_Taller, Inventario_Taller,Personal, Alumno)
from .serializers import (Compras_TallerSerializer, Compras_TallerTallerSerializer, Informe_CuatrimestralSerializer, Informe_CuatrimestralTallerSerializer, Inventario_TallerSerializer, Inventario_TallerTallerSerializer, Materiales_TallerSerializer,
                          Materiales_TallerTallerSerializer, Produccion_TallerSerializer, Produccion_TallerTallererSerializer, TallerEditarCrearSerializer, TallerSerializer, Informe_CuatrimestralTallerSerializer, Ventas_TallerSerializer, Ventas_TallerTallerSerializer, )


# Create your views here.
# VIEW DE TALLER

class TallerListado(APIView):
    """ Listado Taller """

    def get(self, request):
        taller = Taller.objects.all().order_by('id')
        serializer = TallerSerializer(taller, many=True)
        return Response(serializer.data)


class TallerBuscarPorId(APIView):
    """ view de busqueda de taller por ID"""

    def get(self, request, pk):
        taller = Taller.objects.filter(id=pk)
        serializer = TallerSerializer(taller, many=True)
        return Response(serializer.data)


class TallerRegistrar(APIView):
    """ view para registrar taller
    def post(self, request):
        serializer = TallerSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)       
    
    """
    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = TallerEditarCrearSerializer(data=data)
        if serializer.is_valid():
            nuevo_taller = Taller.objects.create(**serializer.validated_data)
        
            nuevo_taller.alumno_id.set(data.get('alumno_id'))
            nuevo_taller.personal_id.set(data.get('personal_id'))
        
            
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    

class TallerEditar(APIView):
    """ view para editar un taller """

    def put(self, request, pk):
        taller = Taller.objects.get(id=pk)
        serializer = TallerEditarCrearSerializer(instance=taller, data=request.data)
        if serializer.is_valid():
            taller_actualizado= serializer.save()
            
            taller_actualizado.alumno_id.set(request.data.get('alumno_id'))
            taller_actualizado.personal_id.set(request.data.get('personal_id'))
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = 400)


class TallerEliminar(APIView):
    """ view para eliminar taller """

    def delete(self, request, pk):
        taller = Taller.objects.get(id=pk)
        taller.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# VIEW DE INFORMES CUATRIMESTRALES


class InformeCuatrimestralListado(APIView):
    """ view para listar informes cuatrimetrales"""

    def get(self, request):
        informe_cuatrimestral = Informe_Cuatrimestral.objects.all().order_by('id')
        serializer = Informe_CuatrimestralTallerSerializer(
            informe_cuatrimestral, many=True)
        return Response(serializer.data)


class InformeCuatrimestralBuscarPorId(APIView):
    """ view para buscar informes cuatrimestrales por id"""

    def get(self, request, pk):
        informe_cuatrimestral = Informe_Cuatrimestral.objects.filter(id=pk)
        serializer = Informe_CuatrimestralSerializer(
            informe_cuatrimestral, many=True)
        return Response(serializer.data)


class InformeCuatrimestralRegistrar(APIView):
    """ view para registrar informe cuatrimestral"""

    def post(self, request):
        informe_cuatrimestral = Informe_Cuatrimestral.objects.all()
        serializer = Informe_CuatrimestralSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class InformeCuatrimestralEditar(APIView):
    """ view para editar informes cuatrimestrales"""

    def put(self, request, pk):
        informe_cuatrimestral = Informe_Cuatrimestral.objects.get(id=pk)
        serializer = Informe_CuatrimestralSerializer(
            informe_cuatrimestral, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class InformeCuatrimestralEliminar(APIView):
    """ view para eliminar informes cuatrimestrales"""

    def delete(self, request, pk):
        informe_cuatrimestral = Informe_Cuatrimestral.objects.get(id=pk)
        informe_cuatrimestral.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# VIEW DE MATERIALES DE TALLER

class MaterialesTallerListado(APIView):
    """ view para listar materiales de talller """

    def get(self, request):
        materiales_taller = Materiales_Taller.objects.all().order_by('id')
        serializer = Materiales_TallerTallerSerializer(
            materiales_taller, many=True)
        return Response(serializer.data)


class MaterialesTallerBuscarPorId(APIView):
    """ view para buscar materiales de taller por id"""

    def get(self, request, pk):
        materiales_taller = Materiales_Taller.objects.filter(id=pk)
        serializer = Materiales_TallerSerializer(materiales_taller, many=True)
        return Response(serializer.data)


class MaterialesTallerRegistrar(APIView):
    """ view para registrar materiales de taller"""

    def post(self, request):
        materiales_taller = Materiales_Taller.objects.all()
        serializer = Materiales_TallerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class MaterialesTallerEditar(APIView):
    """ view para editar materiales de taller"""

    def put(self, request, pk):
        materiales_taller = Materiales_Taller.objects.get(id=pk)
        serializer = Materiales_TallerSerializer(
            materiales_taller, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class MaterialesTallerEliminar(APIView):
    """ view para eliminar materiales de taller"""

    def delete(self, request, pk):
        materiales_taller = Materiales_Taller.objects.get(id=pk)
        materiales_taller.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# VIEW DE VENTAS DE TALLER


class VentasTallerListado(APIView):
    """ view para el listado de ventas del taller"""

    def get(self, request):
        ventas_taller = Ventas_Taller.objects.all().order_by('id')
        serializer = Ventas_TallerTallerSerializer(ventas_taller, many=True)
        return Response(serializer.data)


class VentasTallerBuscarPorId(APIView):
    """ view para buscar por id ventas de talleres"""

    def get(self, request, pk):
        ventas_taller = Ventas_Taller.objects.filter(id=pk)
        serializer = Ventas_TallerSerializer(ventas_taller, many=True)
        return Response(serializer.data)


class VentasTallerRegistrar(APIView):
    """ view de registro de ventas taller"""

    def post(self, request):
        serializer = Ventas_TallerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class VentasTallerEditar(APIView):
    """ view para editar ventas de taller"""

    def put(self, request, pk):
        ventas_taller = Ventas_Taller.objects.get(id=pk)
        serializer = Ventas_TallerSerializer(ventas_taller, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class VentasTallerEliminar(APIView):
    """ view para eliminar ventas de taller"""

    def delete(self, request, pk):
        ventas_taller = Ventas_Taller.objects.get(id=pk)
        ventas_taller.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # VIEW DE PRODUCCION DE TALLERES


class ProduccionTallerListado(APIView):
    """ view de listado de produccion por taller"""

    def get(self, request):
        produccion_taller = Produccion_Taller.objects.all().order_by('id')
        serializer = Produccion_TallerTallererSerializer(
            produccion_taller, many=True)
        return Response(serializer.data)


class ProduccionTallerBuscarPorId(APIView):
    """ view para buscar produccion por taller"""

    def get(self, request, pk):
        produccion_taller = Produccion_Taller.objects.filter(id=pk)
        serializer = Produccion_TallerSerializer(produccion_taller, many=True)
        return Response(serializer.data)


class ProduccionTallerRegistrar(APIView):
    """ view de registro para produccion de talleres"""
    def post(self, request):
        print(request.data)
        serializer = Produccion_TallerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class ProduccionTallerEditar(APIView):
    """ view para editar produccion de taller"""

    def put(self, request, pk):
        produccion_taller = Produccion_Taller.objects.get(id=pk)
        serializer = Produccion_TallerSerializer(
            produccion_taller, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class ProduccionTallerELiminar(APIView):
    """ view para eliminar produccion de taller"""

    def delete(self, request, pk):
        produccion_taller = Produccion_Taller.objects.get(id=pk)
        produccion_taller.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# VIEW DE COMPRAS TALLER


class ComprasTallerListado(APIView):
    """ View de listado de compras por taller"""

    def get(self, request):
        compras_taller = Compras_Taller.objects.all().order_by('id')
        serializer = Compras_TallerTallerSerializer(compras_taller, many=True)
        return Response(serializer.data)


class ComprasTallerBuscarPorId(APIView):
    """ view para buscar compras por taller por ID """

    def get(self, request, pk):
        compras_taller = Compras_Taller.objects.filter(id=pk)
        serializer = Compras_TallerSerializer(compras_taller, many=True)
        return Response(serializer.data)


class ComprasTallerRegistrar(APIView):
    """ view para registrar compras por taller"""

    def post(self, request):
        serializer = Compras_TallerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class ComprasTallerEditar(APIView):
    """ View de edicion de compras por taller"""

    def put(self, request, pk):
        compras_taller = Compras_Taller.objects.get(id=pk)
        serializer = Compras_TallerSerializer(
            compras_taller, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class ComprasTallerEliminar(APIView):
    """ view para eliminar compras de talleres"""

    def delete(self, request, pk):
        compras_taller = Compras_Taller.objects.get(id=pk)
        compras_taller.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # VIEW DE INVENTARIO TALLER


class InventarioTallerListado(APIView):
    """ view de listado de los inventarios por taller"""

    def get(self, request):
        inventario_taller = Inventario_Taller.objects.all().order_by('id')
        serializer = Inventario_TallerTallerSerializer(
            inventario_taller, many=True)
        return Response(serializer.data)


class InventarioTallerBuscarPorId(APIView):
    """ view de busqueda de inventarios de taller por ID"""

    def get(self, request, pk):
        inventario_taller = Inventario_Taller.objects.filter(id=pk)
        serializer = Inventario_TallerSerializer(inventario_taller, many=True)
        return Response(serializer.data)


class InventarioTallerRegistrar(APIView):
    """View para registrar inventarios por taller"""

    def post(self, request):
        serializer = Inventario_TallerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class InventarioTallerEditar(APIView):
    """ view para editar inventarios de taller"""

    def put(self, request, pk):
        inventario_taller = Inventario_Taller.objects.get(id=pk)
        serializer = Inventario_TallerSerializer(
            inventario_taller, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class InventarioTallerEliminar(APIView):
    """  view para eliminar inventarios de taller"""

    def delete(self, request, pk):
        inventario_taller = Inventario_Taller.objects.get(id=pk)
        inventario_taller.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
