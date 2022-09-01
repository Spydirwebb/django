from django.urls import path

from . import views

app_name= 'characters'
urlpatterns = [
    #ex: /character/
    path('', views.index, name='index'),
    #ex: /character/1
    path('<int:character_id>/', views.details, name='details'),
]