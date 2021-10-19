from django.urls import path
from . import views

urlpatterns = [
    #Rutas para el Personal
    path('personal/listados', views.PersonalListado.as_view()),
    path('personal/<int:pk>', views.PersonalBuscarPorId.as_view()),
    path('personal/registrar', views.PersonalRegistrar.as_view()),
    path('personal/editar/<int:pk>', views.PersonalEditar.as_view()),
    path('personal/eliminar/<int:pk>', views.PersonalEliminar.as_view()),
    
    #Rutas para las asistencias personal
    path('personal/asistencia_personal/listados', views.AsistenciaPersonalListado.as_view()),
    path('personal/asistencia_personal/<int:pk>', views.AsistenciaPersonalBuscarPorId.as_view()),
    path('personal/asistencia_personal/registrar', views.AsistenciaPersonalRegistrar.as_view()),
    path('personal/asistencia_personal/editar/<int:pk>', views.AsistenciaPersonalEditar.as_view()),
    path('personal/asistencia_personal/eliminar/<int:pk>', views.AsitenciaPersonalEliminar.as_view()),
    
    #Rutas para permisos de salida personal
    path('personal/permiso_salida/listados', views.PermisoSalidaListado.as_view()),
    path('personal/permiso_salida/<int:pk>', views.PermisoSalidaBuscarPorId.as_view()),
    path('personal/permiso_salida/registrar', views.PermisoSalidaRegistrar.as_view()),
    path('personal/permiso_salida/editar/<int:pk>', views.PermisoSalidaEditar.as_view()),
    path('personal/permiso_salida/eliminar/<int:pk>', views.PermisoSalidaEliminar.as_view()),
    
    #Rutas para evaluacion laboral del personal
    path('personal/evaluacion_laboral/listados', views.EvaluacionLaboralListado.as_view()),
    path('personal/evaluacion_laboral/<int:pk>', views.EvaluacionLaboralBuscarPorId.as_view()),
    path('personal/evaluacion_laboral/registrar', views.EvaluacionLaboralRegistrar.as_view()),
    path('personal/evaluacion_laboral/editar/<int:pk>', views.EvaluacionLaboralEditar.as_view()),
    path('personal/evaluacion_laboral/eliminar/<int:pk>', views.EvaluacionLaboralEliminar.as_view()),
    
    #Rutas para entrega de proyectos del personal
    path('personal/entrega_proyecto/listados', views.EntregaProyectosListado.as_view()),
    path('personal/entrega_proyecto/<int:pk>', views.EntregaProyectoBuscarPorId.as_view()),
    path('personal/entrega_proyecto/registrar', views.EntregaProyectoRegistrar.as_view()),
    path('personal/entrega_proyecto/editar/<int:pk>', views.EntregaProyectoEditar.as_view()),
    path('personal/entrega_proyecto/eliminar/<int:pk>', views.EntregaProyectoEliminar.as_view()),
    
    
    
    
]