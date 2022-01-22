from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from user_app.views import RegistroView,LogoutView


urlpatterns = [
    path('login/', obtain_auth_token, name='login'),
    path('register/', RegistroView, name='register'),
    path('logout/', LogoutView, name='logout'),
]