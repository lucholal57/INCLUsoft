from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import (Alumno, Acta_Compromiso, Antecedente_Medico,
Asistencia_Alumno, Datos_Adicionales, Enfermeria, Patologia)
from .serializers import (Acta_CompromisoPostPutSerializer, AlumnoSerializer, Antecedente_MedicoSerializer, AsistenciaSerializer, Datos_AdicionalesPostPutSerializer,  AsistenciaPostPutSerializer, Antecedente_MedicoPostPutSerializer, Datos_AdicionalesSerializer, EnfermeriaPostPutSerializer, PatologiaPostPutSerializer, PatologiaSerializer, Acta_CompromisoSerializer, EnfermeriaSerializer)

# Create your views here.

#VIEW DE ALUMNOS
@api_view(['GET', 'POST'])
def AlumnoListado(request):

    #List
    if request.method == 'GET':
        alumno = Alumno.objects.all().order_by('id')
        serializer = AlumnoSerializer(alumno, many=True)
        return Response(serializer.data,status= status.HTTP_200_OK)
    
    #Create
    elif request.method == 'POST':
        serializer = AlumnoSerializer(data=request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

# Busqueda por id para la edicion, edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def AlumnoBuscarPorId(request,pk=None):
    #Consulta para obtener el listado en el modal sin first
    alumno = Alumno.objects.filter(id=pk)

    # Validacion
    if alumno:
        
        #Queryset
        if request.method == 'GET':
            serializer = AlumnoSerializer(alumno, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #update
        elif request.method == 'PUT':
            alumno_edicion = Alumno.objects.filter(id=pk).first()
            serializer = AlumnoSerializer(alumno_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        #Delete
        elif request.method == 'DELETE':
            alumno.delete();
            return Response({'message':'Alumno eliminado correctamente!'}, status=status.HTTP_200_OK)
        
    # Validacion no se encontro   
    return Response({'message':'No se ha encontrado un alumno con estos datos'},status=status.HTTP_400_BAD_REQUEST)

#Busqueda de alumno en listado por nombre
@api_view(['GET'])
def BusquedaAlumno(request,nombre_alumno):
    alumno = Alumno.objects.filter(nombre_alumno__icontains= nombre_alumno)
    serializer = AlumnoSerializer(alumno, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)  

#VIEW DE DATOS ADICIONALES
#Listado y creacion
@api_view(['GET', 'POST'])
def DatosAdicionalesListado(request):
    
    #List
    if request.method == 'GET':
        #Queryset
        datos_adicionales = Datos_Adicionales.objects.all().order_by('id')
        serializer = Datos_AdicionalesSerializer(datos_adicionales,many = True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    #Create
    elif request.method == 'POST':
        serializer = Datos_AdicionalesPostPutSerializer(data=request.data)
        
        #Validacion 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def DatosAdicionalesBuscarPorId(request, pk=None):
    #Consulta para obtener el listado en el modal sin first
    datos_adicionales = Datos_Adicionales.objects.filter(id=pk)
    
    # Validacion
    if datos_adicionales:
        
        #Queryset
        if request.method == 'GET':
            serializer = Datos_AdicionalesPostPutSerializer(datos_adicionales, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            #Consulta para editar el contenido del modal con filter
            datos_adicionales_edicion = Datos_Adicionales.objects.filter(id=pk).first()
            serializer = Datos_AdicionalesPostPutSerializer(datos_adicionales_edicion, data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        #Delete
        elif request.method == 'DELETE':
            datos_adicionales.delete()
            return Response({'message':'Datos adicionales eliminado correctamente!'}, status=status.HTTP_200_OK) 
        
    # Validacion no se encontro   
    return Response({'message':'No se ha encontrado un dato adicional con estos datos'},status=status.HTTP_400_BAD_REQUEST)       

#Busqueda de alumno en listado de datos adicionales por nombre
@api_view(['GET'])
def BusquedaAlumnoDatosAdicionales(request, nombre_alumno):
    alumno = Alumno.objects.filter(nombre_alumno__icontains = nombre_alumno)
    datos_adiconales = Datos_Adicionales.objects.filter(alumno__in = alumno)
    serializer = Datos_AdicionalesSerializer(datos_adiconales, many=True)
    return Response(serializer.data, status= status.HTTP_200_OK)            

#VIEW DE ASISTENCIAS
#Listado y Creacion
@api_view(['GET', 'POST'])
def AsistenciaListado(request):
    
    #List
    if request.method == 'GET':
        asistencia = Asistencia_Alumno.objects.all().order_by('id')
        serializer = AsistenciaSerializer(asistencia, many = True)
        return Response(serializer.data, status= status.HTTP_200_OK)

    #Create
    elif request.method == 'POST':
        serializer = AsistenciaPostPutSerializer(data=request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#Busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def AsistenciaBuscarPorId(request, pk=None):
    #Consulta para obtener el listado en el modal sin first
    asistencia = Asistencia_Alumno.objects.filter(id=pk)
    
    #VAlidacion
    if asistencia:
        
        #Queryset
        if request.method == 'GET':
            serializer = AsistenciaPostPutSerializer(asistencia, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        #Update
        elif request.method == 'PUT':
            #Consulta para editar el contenido del modal con First
            asistencia_edicion = Asistencia_Alumno.objects.filter(id=pk).first()
            serializer = AsistenciaPostPutSerializer(asistencia_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        #Delete
        elif request.method == 'DELETE':
            asistencia.delete()
            return Response({'message':'Asistencia eliminada correctamente!'}, status=status.HTTP_200_OK)
    
    # Validacion no se encontro   
    return Response({'message':'No se ha encontrado una asistencia con estos datos'},status=status.HTTP_400_BAD_REQUEST)

#Busqueda de alumno en listado de Asistencias por nombre
@api_view(['GET'])
def BusquedaAlumnoAsistencia(request, nombre_alumno):
    alumno = Alumno.objects.filter(nombre_alumno__icontains = nombre_alumno)
    asistencia = Asistencia_Alumno.objects.filter(alumno__in = alumno)
    serializer = AsistenciaSerializer(asistencia, many=True)
    return Response (serializer.data, status= status.HTTP_200_OK)

#VIEW DE ANTECEDENTES MEDICOS
#Listado y Creacion
@api_view(['GET', 'POST'])
def AntecedenteMedicoListado(request):
    
    #List
    if request.method == 'GET':
        #Queryset
        antecedente_medico = Antecedente_Medico.objects.all().order_by('id')
        serializer = Antecedente_MedicoSerializer(antecedente_medico, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    #Create
    elif request.method == 'POST':
        serializer = Antecedente_MedicoPostPutSerializer(data=request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def AntecedenteMedicoBuscarPorId(request, pk=None):
    #Consulta para obtener el listado en el modal sin First
    antecedente_medico = Antecedente_Medico.objects.filter(id=pk)
    
    # Validacion
    if antecedente_medico:
        
        #Queryset
        if request.method == 'GET':
            serializer = Antecedente_MedicoPostPutSerializer(antecedente_medico, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            #Consulta para editar el contenido en el modal con First
            antecedente_medico_edicion = Antecedente_Medico.objects.filter(id=pk).first()
            serializer = Antecedente_MedicoPostPutSerializer(antecedente_medico_edicion, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        #Delete
        elif request.method == 'DELETE':
            antecedente_medico.delete()
            return Response({'message':'Antecedente Medico  eliminado correctamente!'}, status=status.HTTP_200_OK)
        
    # Validacion no se encontro   
    return Response({'message':'No se ha encontrado un antecedente medico con estos datos'},status=status.HTTP_400_BAD_REQUEST)   

#Busqueda de alumno en listado de Antecedentes medicos por nombre
@api_view(['GET'])
def BusquedaAlumnoAntecedenteMedico(request, nombre_alumno):
    alumno = Alumno.objects.filter(nombre_alumno__icontains = nombre_alumno)
    antecedente_medico= Antecedente_Medico.objects.filter(alumno__in = alumno)
    serializer = Antecedente_MedicoSerializer(antecedente_medico, many=True)
    return Response (serializer.data, status= status.HTTP_200_OK)
    

#VIEW DE PATOLOGIAS
#Listado y Creacion
@api_view(['GET', 'POST'])
def PatologiaListado(request):
    
    #List
    if request.method == 'GET':
        #Queryset
        patologia = Patologia.objects.all().order_by('id')
        serializer = PatologiaSerializer(patologia, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    # Create
    elif request.method == 'POST':
        serializer = PatologiaPostPutSerializer(data=request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def PatologiaBuscarPorId(request, pk=None):
    #Consulta para obtener el listado en el modal sin First
    patologia = Patologia.objects.filter(id=pk)
    
    #Validacion
    if patologia:
        
        #Queryset
        if request.method == 'GET':
            serializer = PatologiaPostPutSerializer(patologia, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            # Consulta para editar el contenido del modal con First
            patologia_edicion = Patologia.objects.filter(id=pk).first()
            serializer = PatologiaPostPutSerializer(patologia_edicion, data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        #Delete
        elif request.method == 'DELETE':
            patologia.delete();
            return Response({'message':'Patologia eliminada correctamente!'}, status=status.HTTP_200_OK)
        
    # Validacion no se encontro   
    return Response({'message':'No se ha encontrado ninguna patologia con estos datos'},status=status.HTTP_400_BAD_REQUEST)

#Busqueda de alumno en listado de Patologias por nombre
@api_view(['GET'])
def BusquedaAlumnoPatologia(request, nombre_alumno):
    alumno = Alumno.objects.filter(nombre_alumno__icontains = nombre_alumno)
    patologia= Patologia.objects.filter(alumno__in = alumno)
    serializer = PatologiaSerializer(patologia, many=True)
    return Response (serializer.data, status= status.HTTP_200_OK)
    

#VIEW DE ACTA COMPROMISO
# Listado y Creacion
@api_view(['GET', 'POST'])
def ActaCompromisoListado(request):
    
    #list
    if request.method == 'GET':
        #Queryset
        acta_compromiso = Acta_Compromiso.objects.all().order_by('id')
        serializer = Acta_CompromisoSerializer(acta_compromiso, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    #Create
    elif request.method == 'POST':
        serializer = Acta_CompromisoPostPutSerializer(data= request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# Busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def ActaCompromisoBuscarPorId(request, pk=None):
    #Consulta para obtener el listado en el modal sin First
    acta_compromiso = Acta_Compromiso.objects.filter(id=pk)
    
    #Validacion
    if acta_compromiso:
        
        #Queryset
        if request.method == 'GET':
            serializer = Acta_CompromisoPostPutSerializer(acta_compromiso, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        #Update
        elif request.method == 'PUT':
            # Consulta para editar el contenido del modal con First
            acta_compromiso_edicion = Acta_Compromiso.objects.filter(id=pk).first()
            serializer = Acta_CompromisoPostPutSerializer(acta_compromiso_edicion, data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        #Delete
        elif request.method == 'DELETE':
            acta_compromiso.delete()
            return Response({'message':'Acta compromiso eliminada correctamente!'}, status=status.HTTP_200_OK)
        
 # Validacion no se encontro   
    return Response({'message':'No se ha encontrado un acta compromiso con estos datos'},status=status.HTTP_400_BAD_REQUEST)

#Busqueda de alumno en listado de Actas Compromiso  por nombre
@api_view(['GET'])
def BusquedaAlumnoActaCompromiso(request, nombre_alumno):
    alumno = Alumno.objects.filter(nombre_alumno__icontains = nombre_alumno)
    acta_compromiso= Acta_Compromiso.objects.filter(alumno__in = alumno)
    serializer = Acta_CompromisoSerializer(acta_compromiso, many=True)
    return Response (serializer.data, status= status.HTTP_200_OK)
    

#VIEW DE  ENFERMERIA
#Listado y Creacion
@api_view(['GET', 'POST'])
def EnfermeriaListado(request):
    
    #List
    if request.method == 'GET':
        #Queryset
        enfermeria = Enfermeria.objects.all().order_by('id')
        serializer = EnfermeriaSerializer(enfermeria, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
    #Create
    elif request.method == 'POST':
        serializer = EnfermeriaPostPutSerializer(data=request.data)
        
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# Busqueda por id para la edicion y eliminacion
@api_view(['GET', 'PUT', 'DELETE'])
def EnfermeriaBuscarPorId(request, pk=None):
    #Consulta para obtener el listado en el modal sin First
    enfermeria = Enfermeria.objects.filter(id=pk)
    
    #Validacion
    if enfermeria: 
        
        #Queryset
        if request.method == 'GET':
            serializer = EnfermeriaPostPutSerializer(enfermeria, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        #Update
        elif request.method == 'PUT':
            #Consulta para editar el contenido del modal con First
            enfermeria_edicion = Enfermeria.objects.filter(id=pk).first()
            serializer = EnfermeriaPostPutSerializer(enfermeria_edicion, data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        #Delete
        elif request.method == 'DELETE':
            enfermeria.delete()
            return Response({'message':'Enfermeria eliminada correctamente!'}, status=status.HTTP_200_OK)
        
# Validacion no se encontro   
    return Response({'message':'No se ha encontrado una enfermeria con estos datos'},status=status.HTTP_400_BAD_REQUEST)

#Busqueda de alumno en listado de Actas Compromiso  por nombre
@api_view(['GET'])
def BusquedaAlumnoEnfermeria(request, nombre_alumno):
    alumno = Alumno.objects.filter(nombre_alumno__icontains = nombre_alumno)
    enfermeria= Enfermeria.objects.filter(alumno__in = alumno)
    serializer = EnfermeriaSerializer(enfermeria, many=True)
    return Response (serializer.data, status= status.HTTP_200_OK)
