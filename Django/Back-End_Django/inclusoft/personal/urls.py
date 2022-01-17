from django.urls import path
from personal.views import (PersonalListado,PersonalBuscarPorId,BusquedaPersonal,
                            AsistenciaListado, AsistenciaBuscarPorId, BusquedaAsistenciaPersonal,
                            PermisoSalidaListado, PermisoSalidaBuscarPorId,BusquedaPermisoSalidaPersonal,
                            EvaluacionLaboralListado,EvaluacionLaboralBuscarPorId,BusquedaEvaluacionLaboralPersonal,
                            EntregaProyectoListado,EntregaProyectoBuscarPorId,BusquedaEntregaProyectoPersonal)

urlpatterns = [
    #Rutas para el Personal
    path('personal', PersonalListado),
    path('personal/<int:pk>', PersonalBuscarPorId),
    path('personal/buscar/<str:nombre_personal>', BusquedaPersonal),
    
    #Rutas para las asistencias personal
    path('asistencia_personal', AsistenciaListado),
    path('asistencia_personal/<int:pk>', AsistenciaBuscarPorId),
    path('asistencia_personal/buscar/<str:nombre_personal>', BusquedaAsistenciaPersonal),
    
    #Rutas para permisos de salida personal
    path('permiso_salida', PermisoSalidaListado),
    path('permiso_salida/<int:pk>', PermisoSalidaBuscarPorId),
    path('permiso_salida/buscar/<str:nombre_personal>', BusquedaPermisoSalidaPersonal),
    
    #Rutas para evaluacion laboral del personal
    path('evaluacion_laboral', EvaluacionLaboralListado),
    path('evaluacion_laboral/<int:pk>', EvaluacionLaboralBuscarPorId),
    path('evaluacion_laboral/buscar/<str:nombre_personal>', BusquedaEvaluacionLaboralPersonal),

    #Rutas para entrega de proyectos del personal
    path('entrega_proyecto', EntregaProyectoListado),
    path('entrega_proyecto/<int:pk>', EntregaProyectoBuscarPorId),
    path('entrega_proyecto/buscar/<str:nombre_personal>', BusquedaEntregaProyectoPersonal),
    
]