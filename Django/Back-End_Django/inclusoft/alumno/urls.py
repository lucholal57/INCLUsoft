from django.urls import path
from . import views

urlpatterns = [
    #Rutas para los alumnos
    path('alumno/listados', views.AlumnoListado.as_view()),
    path('alumno/<int:pk>', views.AlumnoBuscarPorId.as_view()),
    path('alumno/registrar', views.AlumnoRegistrar.as_view()),
    path('alumno/editar/<int:pk>', views.AlumnoEditar.as_view()),
    path('alumno/eliminar/<int:pk>', views.AlumnoEliminar.as_view()),
    
    #Rutas para los datos adicionales
    path('alumno/datos_adicionales/listados', views.DatosAdicionalesListado.as_view()),
    path('alumno/datos_adicionales/<int:pk>', views.DatosAdicionalesBuscarPorId.as_view()),
    path('alumno/datos_adicionales/registrar', views.DatosAdicionalesRegistrar.as_view()),
    path('alumno/datos_adicionales/editar/<int:pk>' , views.DatosAdicionalesEditar.as_view()),
    path('alumno/datos_adicionales/eliminar/<int:pk>', views.DatosAdicionalesEliminar.as_view()),
    
    #Rutas para las asistencias
    path('alumno/asistencia/listados', views.AsistenciaListado.as_view()),
    path('alumno/asistencia/<int:pk>' , views.AsistenciaBuscarPorId.as_view()),
    path('alumno/asistencia/registrar' , views.AsistenciaRegistrar.as_view()),
    path('alumno/asistencia/editar/<int:pk>', views.AsistenciaEditar.as_view()),
    path('alumno/asistencia/eliminar/<int:pk>', views.AsistenciaEliminar.as_view()),
    
    #Rutas para los antecedentes medicos
    path('alumno/antecedente_medico/listados' , views.AntecedenteMedicoListado.as_view()),
    path('alumno/antecedente_medico/<int:pk>' , views.AntecedenteMedicoBuscarPorId.as_view()),
    path('alumno/antecedente_medico/registrar' , views.AntecedenteMedicoregistrar.as_view()),
    path('alumno/antecedente_medico/editar/<int:pk>' , views.AntecedenteMedicoEditar.as_view()),
    path('alumno/antecedente_medico/eliminar/<int:pk>' , views.AntecedenteMedicoEliminar.as_view()),
    
    #Rutas para las patologias
    path('alumno/patologia/listados', views.PatologiaListado.as_view()),
    path('alumno/patologia/<int:pk>', views.PatologiaBuscarPorId.as_view()),
    path('alumno/patologia/registrar', views.PatologiaRegistrar.as_view()),
    path('alumno/patologia/editar/<int:pk>', views.PatologiaEditar.as_view()),
    path('alumno/patologia/eliminar/<int:pk>', views. PatologiaEliminar.as_view()),
    
    #Rutas para la enfermeria
    path('alumno/enfermeria/listados', views.EnfermeriaListado.as_view()),
    path('alumno/enfermeria/<int:pk>', views.EnfermeriaBuscarPorId.as_view()),
    path('alumno/enfermeria/registrar', views.EnfermeriaRegistrar.as_view()),
    path('alumno/enfermeria/editar/<int:pk>', views.EnfermeriaEditar.as_view()),
    path('alumno/enfermeria/eliminar/<int:pk>', views.EnfermeriaEliminar.as_view()),
    
    #Rutas para acta compromiso
    path('alumno/acta_compromiso/listados', views.ActaCompromisoListado.as_view()),
    path('alumno/acta_compromiso/<int:pk>', views.ActaCompromisoBuscarPorId.as_view()),
    path('alumno/acta_compromiso/registrar', views.ActaCompromisoRegistrar.as_view()),
    path('alumno/acta_compromiso/editar/<int:pk>', views.ActaCompromisoEditar.as_view()),
    path('alumno/acta_compromiso/eliminar/<int:pk>', views.ActaCompromisoEliminar.as_view())
    
]