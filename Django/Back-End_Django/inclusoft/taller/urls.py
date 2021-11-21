from django.urls import path
from . import views

urlpatterns = [
    #Rutas para el taller
    path('taller/listados', views.TallerListado.as_view()),
    path('taller/<int:pk>', views.TallerBuscarPorId.as_view()),
    path('taller/registrar', views.TallerRegistrar.as_view()),
    path('taller/editar/<int:pk>', views.TallerEditar.as_view()),
    path('taller/eliminar/<int:pk>', views.TallerEliminar.as_view()),
    
    #Rutas para informes cuatrimestrales
    path('taller/informes_cuatrimestrales/listados', views.InformeCuatrimestralListado.as_view()),
    path('taller/informes_cuatrimestrales/<int:pk>', views.InformeCuatrimestralBuscarPorId.as_view()),
    path('taller/informes_cuatrimestrales/registrar', views.InformeCuatrimestralRegistrar.as_view()),
    path('taller/informes_cuatrimestrales/editar/<int:pk>', views.InformeCuatrimestralEditar.as_view()),
    path('taller/informes_cuatrimestrales/eliminar/<int:pk>', views.InformeCuatrimestralEliminar.as_view()),
    
]