from django.urls import path
from taller.views import (TallerListado,TallerBuscarPorId,BusquedaTallerPorNombre,
                        InformeCuatrimestralListado,InformeCuatrimestralBuscarPorId,BusquedaInformeCuatrimestralTaller,
                        MaterialesTallerListado,MaterialesTallerBuscarPorId,BusquedaMaterialesTaller,
                        VentasTallerListado,VentasTallerBuscarPorId,BusquedaVentasTaller,
                        ProduccionTallerListado,ProduccionTallerBuscarPorId,BusquedaProduccionTaller,
                        ComprasTallerListado,ComprasTallerBuscarPorId,BusquedaComprasTaller,
                        InventarioTallerListado,InventarioTallerBuscarPorId,BusquedaInventarioTaller, BusquedaMaterialesTallerProduccion)



urlpatterns = [
    #Rutas para el taller
    path('taller', TallerListado),
    path('taller/<int:pk>', TallerBuscarPorId),
    path('taller/buscar/<str:nombre_taller>', BusquedaTallerPorNombre),
    
    #Rutas para informes cuatrimestrales
    path('informes_cuatrimestrales', InformeCuatrimestralListado),
    path('informes_cuatrimestrales/<int:pk>', InformeCuatrimestralBuscarPorId),
    path('informes_cuatrimestrales/buscar/<str:nombre_taller>', BusquedaInformeCuatrimestralTaller),

    #Rutas para materiales del taller
    path('materiales_taller', MaterialesTallerListado),
    path('materiales_taller/<int:pk>', MaterialesTallerBuscarPorId),
    path('materiales_taller/buscar/<str:nombre_taller>', BusquedaMaterialesTaller),
    path('materiales_taller/buscar/stock/<str:insumos_disponibles>', BusquedaMaterialesTallerProduccion),
    
    #Rutas para ventas de taller
    path('ventas_taller', VentasTallerListado),
    path('ventas_taller/<int:pk>', VentasTallerBuscarPorId),
    path('ventas_taller/buscar/<str:nombre_taller>', BusquedaVentasTaller),

    #Rutas para produccion de taller
    path('produccion_taller', ProduccionTallerListado),
    path('produccion_taller/<int:pk>', ProduccionTallerBuscarPorId),
    path('produccion_taller/buscar/<str:nombre_taller>',BusquedaProduccionTaller),
    
    #Rutas para Compras Taller
    path('compras_taller', ComprasTallerListado),
    path('compras_taller/<int:pk>', ComprasTallerBuscarPorId),
    path('compras_taller/buscar/<str:nombre_taller>', BusquedaComprasTaller),
    #Rutas para Inventario Taller
    path('inventario_taller', InventarioTallerListado),
    path('inventario_taller/<int:pk>', InventarioTallerBuscarPorId),
    path('inventario_taller/buscar/<str:nombre_taller>', BusquedaInventarioTaller),
]