from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from taller.models import (Taller, Informe_Cuatrimestral, Materiales_Taller,
 Ventas_Taller, Produccion_Taller, Compras_Taller, Inventario_Taller)

from taller.serializers import (Compras_TallerSerializer, Compras_TallerPostPutSerializer, Informe_CuatrimestralSerializer, Informe_CuatrimestralPostPutSerializer,                    Inventario_TallerSerializer, Inventario_TallerPostPutSerializer, Materiales_TallerSerializer,
Materiales_TallerPostPutSerializer, Produccion_TallerSerializer, Produccion_TallerPostPutSerializer, TallerPostPutSerializer, TallerSerializer, Ventas_TallerSerializer, Ventas_TallerPostPutSerializer, )


# Create your views here.
# VIEW DE TALLER
#Listado y Creacion
@api_view(['GET', 'POST'])
def TallerListado(request, *args, **kwargs):
    
    #List
    if request.method == 'GET':
        #Queryset
        taller = Taller.objects.all().order_by('id')
        serializer = TallerSerializer(taller,many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    #Create 
    elif request.method == 'POST':
        serializer = TallerPostPutSerializer(data=request.data)
        
        #Validacion
        if serializer.is_valid():
            nuevo_taller = Taller.objects.create(**serializer.validated_data)
            nuevo_taller.alumno_id.set(request.data.get('alumno_id'))
            nuevo_taller.personal_id.set(request.data.get('personal_id'))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# Busqueda por id de taller para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def TallerBuscarPorId(request, pk=None):
    # Consulta para obtener el listado en el modal sin First
    taller = Taller.objects.filter(id=pk)
    
    #Validacion
    if taller:
        #Queryset
        if request.method == 'GET':
            serializer = TallerPostPutSerializer(taller, many=True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            #Consulta para editar el contenido del modal con First
            taller_edicion = Taller.objects.filter(id=pk).first()
            serializer = TallerPostPutSerializer(instance=taller_edicion, data=request.data)
            if serializer.is_valid():
                taller_actualizado =serializer.save()
                taller_actualizado.alumno_id.set(request.data.get('alumno_id'))
                taller_actualizado.personal_id.set(request.data.get('personal_id'))
                return Response(serializer.data, status = status.HTTP_200_OK)
            else:
                return Response(serializer.data, status = status.HTTP_400_BAD_REQUEST)
            
        #Delete
        elif request.method == 'DELETE':
            taller.delete()
            return Response({'message':'Tallereliminado correctamente!'}, status=status.HTTP_200_OK)
        
# Validacion no se encontro   
    return Response({'message':'No se ha encontrado un Taller con estos datos'},status=status.HTTP_400_BAD_REQUEST)

#Busqueda de taller por nombre
@api_view(['GET'])
def BusquedaTallerPorNombre(request,nombre_taller):
    taller = Taller.objects.filter(nombre_taller__icontains=nombre_taller)
    serializer = TallerSerializer(taller, many=True)
    return Response(serializer.data, status = status.HTTP_200_OK)

# VIEW DE INFORMES CUATRIMESTRALES
#Listado y Creacion
@api_view(['GET', 'POST'])
def InformeCuatrimestralListado(request):
    
    #List
    if request.method == 'GET':
        #Queryset
        informe_cuatrimestral = Informe_Cuatrimestral.objects.all().order_by('id')
        serializer = Informe_CuatrimestralSerializer(informe_cuatrimestral, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    #Create
    elif request.method == 'POST':
        serializer = Informe_CuatrimestralPostPutSerializer(data=request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#Busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def InformeCuatrimestralBuscarPorId(request, pk=None):
    #Consulta para obtener el listado en el modal sin First
    informe_cuatrimestral = Informe_Cuatrimestral.objects.filter(id=pk)
    
    #Validacion
    if informe_cuatrimestral:
        #Queryset
        if request.method == 'GET':
            serializer = Informe_CuatrimestralPostPutSerializer(informe_cuatrimestral, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            # Consulta para editar el contenido con First
            informe_cuatrimestral_edicion = Informe_Cuatrimestral.objects.filter(id=pk).first()
            serializer = Informe_CuatrimestralPostPutSerializer(informe_cuatrimestral_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        #Delete
        elif request.method == 'DELETE':
            informe_cuatrimestral.delete()
            return Response({'message':'Informe Cuatrimestral eliminado correctamente!'}, status=status.HTTP_200_OK)
        
# Validacion no se encontro   
    return Response({'message':'No se ha encontrado un acompañante con estos datos'},status=status.HTTP_400_BAD_REQUEST)

#Busqueda de informe cuatrimestal por taller
@api_view(['GET'])
def BusquedaInformeCuatrimestralTaller(request,nombre_taller):
    taller = Taller.objects.filter(nombre_taller__icontains=nombre_taller)
    informe_cuatrimestral = Informe_Cuatrimestral.objects.filter(taller__in = taller)
    serializer = Informe_CuatrimestralSerializer(informe_cuatrimestral, many=True)
    return Response(serializer.data, status = status.HTTP_200_OK)
        
# VIEW DE MATERIALES DE TALLER
#Listado y Creacion
@api_view(['GET', 'POST'])
def MaterialesTallerListado(request):
    
    #List
    if request.method == 'GET':
        #Queryset
        materiales = Materiales_Taller.objects.all().order_by('id')
        serializer = Materiales_TallerSerializer(materiales, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    #Create
    elif request.method == 'POST':
        serializer = Materiales_TallerPostPutSerializer(data=request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def MaterialesTallerBuscarPorId(request, pk=None):
    #Consulta para obtener el listado en el modal sin First
    materiales = Materiales_Taller.objects.filter(id=pk)
    
    #Validacion
    if materiales:
        #Queryset
        if request.method == 'GET':
            serializer = Materiales_TallerPostPutSerializer(materiales, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            # Consulta para editar el contenido con First
            materiales_edicion = Materiales_Taller.objects.filter(id=pk).first()
            serializer = Materiales_TallerPostPutSerializer(materiales_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        #Delete
        elif request.method == 'DELETE':
            materiales.delete()
            return Response({'message':'MAteriales eliminado correctamente!'}, status=status.HTTP_200_OK)
        
# Validacion no se encontro   
    return Response({'message':'No se ha encontrado un material con estos datos'},status=status.HTTP_400_BAD_REQUEST)

#Busqueda de materiales por taller
@api_view(['GET'])
def BusquedaMaterialesTaller(request,nombre_taller):
    taller = Taller.objects.filter(nombre_taller__icontains=nombre_taller)
    materiales = Materiales_Taller.objects.filter(taller__in = taller)
    serializer = Materiales_TallerSerializer(materiales, many=True)
    return Response(serializer.data, status = status.HTTP_200_OK)

# VIEW DE VENTAS DE TALLER
#Listado y Creacion
@api_view(['GET', 'POST'])
def VentasTallerListado(request):
    
    #List
    if request.method == 'GET':
        #Queryset
        ventas = Ventas_Taller.objects.all().order_by('id')
        serializer = Ventas_TallerSerializer(ventas, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    #Create
    elif request.method == 'POST':
        serializer = Ventas_TallerPostPutSerializer(data=request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#Busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def VentasTallerBuscarPorId(request, pk=None):
    # Consulta para obtener el listado en el modal sin First
    ventas = Ventas_Taller.objects.filter(id=pk)
    
    #validacion
    if ventas:
        #List
        if request.method == 'GET':
            #Queryset
            serializer = Ventas_TallerPostPutSerializer(ventas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            # Consulta para editar el contenido con First
            ventas_edicion = Ventas_Taller.objects.filter(id=pk).first()
            serializer = Ventas_TallerPostPutSerializer(ventas_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        #Delete
        elif request.method == 'DELETE':
            ventas.delete()
            return Response({'message':'Venta eliminada correctamente!'}, status=status.HTTP_200_OK)
        
# Validacion no se encontro   
    return Response({'message':'No se ha encontrado una venta con estos datos'},status=status.HTTP_400_BAD_REQUEST)

#Busqueda de ventas por taller
@api_view(['GET'])
def BusquedaVentasTaller(request,nombre_taller):
    taller = Taller.objects.filter(nombre_taller__icontains=nombre_taller)
    ventas = Ventas_Taller.objects.filter(taller__in = taller)
    serializer = Ventas_TallerSerializer(ventas, many=True)
    return Response(serializer.data, status = status.HTTP_200_OK)

# VIEW DE PRODUCCION DE TALLERES
#Listado y Creacion
@api_view(['GET', 'POST'])
def ProduccionTallerListado(request):
    
    #List
    if request.method == 'GET':
        produccion = Produccion_Taller.objects.all().order_by('id')
        serializer = Produccion_TallerSerializer(produccion, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    #Create
    elif request.method == 'POST':
        serializer = Produccion_TallerPostPutSerializer(data=request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# Busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def ProduccionTallerBuscarPorId(request, pk=None):
    # Consulta para obtener el listado en el modal sin First
    produccion = Produccion_Taller.objects.filter(id=pk)
    
    #Validacion
    if produccion:
        
        #List
        if request.method == 'GET':
            serializer = Produccion_TallerPostPutSerializer(produccion, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            #Consulta para editar el contenido con First
            produccion_edicion = Produccion_Taller.objects.filter(id=pk).first()
            serializer = Produccion_TallerPostPutSerializer(produccion_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        #Delete
        elif request.method == 'DELETE':
            produccion.delete()
            return Response({'message':'Produccion eliminado correctamente!'}, status=status.HTTP_200_OK)
        
# Validacion no se encontro   
    return Response({'message':'No se ha encontrado una produccion con estos datos'},status=status.HTTP_400_BAD_REQUEST)

#Busqueda de produccion por taller
@api_view(['GET'])
def BusquedaProduccionTaller(request,nombre_taller):
    taller = Taller.objects.filter(nombre_taller__icontains=nombre_taller)
    produccion = Produccion_Taller.objects.filter(taller__in = taller)
    serializer = Produccion_TallerSerializer(produccion, many=True)
    return Response(serializer.data, status = status.HTTP_200_OK)
    
# VIEW DE COMPRAS TALLER
#Listado y Creacion
@api_view(['GET', 'POST'])
def ComprasTallerListado(request):
    
    #List
    if request.method == 'GET':
        compras = Compras_Taller.objects.all().order_by('id')
        serializer = Compras_TallerSerializer(compras, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    #Create
    elif request.method == 'POST':
        serializer = Compras_TallerPostPutSerializer(data=request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#Busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def ComprasTallerBuscarPorId(request, pk=None):
    #Consulta para obtener el listado en el modal sin First
    compras = Compras_Taller.objects.filter(id=pk)
    
    #Validacion
    if compras:
        #Queryset
        if request.method == 'GET':
            serializer = Compras_TallerPostPutSerializer(compras, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            #Consulta para editar el contenido con First
            compras_edicion = Compras_Taller.objects.filter(id=pk).first()
            serializer = Compras_TallerPostPutSerializer(compras_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        #Delete
        if request.method == 'DELETE':
            compras.delete()
            return Response({'message':'Compra eliminado correctamente!'}, status=status.HTTP_200_OK)
    
# Validacion no se encontro   
    return Response({'message':'No se ha encontrado una compra con estos datos'},status=status.HTTP_400_BAD_REQUEST)

#Busqueda de compra por taller
@api_view(['GET'])
def BusquedaComprasTaller(request,nombre_taller):
    taller = Taller.objects.filter(nombre_taller__icontains=nombre_taller)
    compras = Compras_Taller.objects.filter(taller__in = taller)
    serializer = Compras_TallerSerializer(compras, many=True)
    return Response(serializer.data, status = status.HTTP_200_OK)

# VIEW DE INVENTARIO TALLER
#Listado y Creacion
@api_view(['GET', 'POST'])
def InventarioTallerListado(request):
    
    #List
    if request.method == 'GET':
        inventario = Inventario_Taller.objects.all().order_by('id')
        serializer = Inventario_TallerSerializer(inventario, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    #Create
    elif request.method == 'POST':
        serializer = Inventario_TallerPostPutSerializer(data=request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#Busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def InventarioTallerBuscarPorId(request, pk=None):
    # Consulta para obtener el listado en el modal sin First
    inventario = Inventario_Taller.objects.filter(id=pk)
    
    #Validacion
    if inventario:
        #List
        if request.method == 'GET':
            #Queryset
            serializer = Inventario_TallerPostPutSerializer(inventario,many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            # Consulta para editar el contenido con First
            inventario_edicion= Inventario_Taller.objects.filter(id=pk).first()
            serializer = Inventario_TallerPostPutSerializer(inventario_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        #Delete
        if request.method == 'DELETE':
            inventario.delete()
            return Response({'message':'Inventarioeliminado correctamente!'}, status=status.HTTP_200_OK)
    
# Validacion no se encontro   
    return Response({'message':'No se ha encontrado un inventario con estos datos'},status=status.HTTP_400_BAD_REQUEST)

#Busqueda de inventario por taller
@api_view(['GET'])
def BusquedaInventarioTaller(request,nombre_taller):
    taller = Taller.objects.filter(nombre_taller__icontains=nombre_taller)
    inventario = Inventario_Taller.objects.filter(taller__in = taller)
    serializer = Inventario_TallerSerializer(inventario, many=True)
    return Response(serializer.data, status = status.HTTP_200_OK)
