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
    
    #Rutas para materiales del taller
    path('taller/materiales_taller/listados', views.MaterialesTallerListado.as_view()),
    path('taller/materiales_taller/<int:pk>', views.MaterialesTallerBuscarPorId.as_view()),
    path('taller/materiales_taller/registrar', views.MaterialesTallerRegistrar.as_view()),
    path('taller/materiales_taller/editar/<int:pk>', views.MaterialesTallerEditar.as_view()),
    path('taller/materiales_taller/eliminar/<int:pk>', views.MaterialesTallerEliminar.as_view()),
    
    #Rutas para ventas de taller
    path('taller/ventas_taller/listados', views.VentasTallerListado.as_view()),
    path('taller/ventas_taller/<int:pk>', views.VentasTallerBuscarPorId.as_view()),
    path('taller/ventas_taller/registrar', views.VentasTallerRegistrar.as_view()),
    path('taller/ventas_taller/editar/<int:pk>', views.VentasTallerEditar.as_view()),
    path('taller/ventas_taller/eliminar/<int:pk>', views.VentasTallerEliminar.as_view()),
    
    #Rutas para produccion de taller
    path('taller/produccion_taller/listados', views.ProduccionTallerListado.as_view()),
    path('taller/produccion_taller/<int:pk>', views.ProduccionTallerBuscarPorId.as_view()),
    path('taller/produccion_taller/registrar', views.ProduccionTallerRegistrar.as_view()),
    path('taller/produccion_taller/editar/<int:pk>', views.ProduccionTallerEditar.as_view()),
    path('taller/produccion_taller/eliminar/<int:pk>', views.ProduccionTallerELiminar.as_view()),
    
    #Rutas para Compras Taller
    path('taller/compras_taller/listados', views.ComprasTallerListado.as_view()),
    path('taller/compras_taller/<int:pk>', views.ComprasTallerBuscarPorId.as_view()),
    path('taller/compras_taller/registrar', views.ComprasTallerRegistrar.as_view()),
    path('taller/compras_taller/editar/<int:pk>', views.ComprasTallerEditar.as_view()),
    path('taller/compras_taller/eliminar/<int:pk>', views.ComprasTallerEliminar.as_view()),
    
    #Rutas para Inventario Taller
    path('taller/inventario_taller/listados', views.InventarioTallerListado.as_view()),
    path('taller/inventario_taller/<int:pk>', views.InventarioTallerBuscarPorId.as_view()),
    path('taller/inventario_taller/registrar', views.InventarioTallerRegistrar.as_view()),
    path('taller/inventario_taller/editar/<int:pk>', views.InventarioTallerEditar.as_view()),
    path('taller/inventario_taller/eliminar/<int:pk>', views.InventarioTallerEliminar.as_view()),
    
]