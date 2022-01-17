from django.urls import path
from alumno.views import ( AlumnoListado,AlumnoBuscarPorId,BusquedaAlumno,DatosAdicionalesListado,DatosAdicionalesBuscarPorId,BusquedaAlumnoDatosAdicionales,AsistenciaListado,AsistenciaBuscarPorId, BusquedaAlumnoAsistencia,AntecedenteMedicoListado,AntecedenteMedicoBuscarPorId,BusquedaAlumnoAntecedenteMedico,PatologiaListado, PatologiaBuscarPorId,BusquedaAlumnoPatologia, ActaCompromisoListado,ActaCompromisoBuscarPorId,BusquedaAlumnoActaCompromiso,EnfermeriaListado,EnfermeriaBuscarPorId,BusquedaAlumnoEnfermeria)

urlpatterns = [
    #Rutas para los alumnos
    path('alumno', AlumnoListado ),
    path('alumno/<int:pk>', AlumnoBuscarPorId),
    path('alumno/buscar/<str:nombre_alumno>', BusquedaAlumno),
    
    #Rutas para los datos adicionales
    path('datos_adicionales',DatosAdicionalesListado ),
    path('datos_adicionales/<int:pk>', DatosAdicionalesBuscarPorId),
    path('datos_adicionales/buscar/<str:nombre_alumno>', BusquedaAlumnoDatosAdicionales),
    
    #Rutas para las asistencias
    path('asistencia', AsistenciaListado),
    path('asistencia/<int:pk>' , AsistenciaBuscarPorId),
    path('asistencia/buscar/<str:nombre_alumno>', BusquedaAlumnoAsistencia),
    
    
    #Rutas para los antecedentes medicos
    path('antecedente_medico' , AntecedenteMedicoListado),
    path('antecedente_medico/<int:pk>' , AntecedenteMedicoBuscarPorId),
    path('antecedente_medico/buscar/<str:nombre_alumno>' ,BusquedaAlumnoAntecedenteMedico),
    
    
    #Rutas para las patologias
    path('patologia', PatologiaListado),
    path('patologia/<int:pk>',PatologiaBuscarPorId),
    path('patologia/buscar/<str:nombre_alumno>', BusquedaAlumnoPatologia),
    
    #Rutas para acta compromiso
    path('acta_compromiso', ActaCompromisoListado),
    path('acta_compromiso/<int:pk>', ActaCompromisoBuscarPorId),
    path('acta_compromiso/buscar/<str:nombre_alumno>', BusquedaAlumnoActaCompromiso),
    
    #Rutas para la enfermeria
    path('enfermeria', EnfermeriaListado),
    path('enfermeria/<int:pk>', EnfermeriaBuscarPorId),
    path('enfermeria/buscar/<str:nombre_alumno>', BusquedaAlumnoEnfermeria),
     
]