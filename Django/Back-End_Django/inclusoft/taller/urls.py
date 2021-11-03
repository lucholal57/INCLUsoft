from django.urls import path
from . import views

urlpatterns = [
    #Rutas para el taller
    path('taller/listados', views.TallerListado.as_view()),
    path('taller/<int:pk>', views.TallerBuscarPorId.as_view()),
    path('taller/registrar', views.TallerRegistrar.as_view()),
    path('taller/editar/<int:pk>', views.TallerEditar.as_view()),
    path('taller/eliminar/<int:pk>', views.TallerEliminar.as_view())
    
    
]