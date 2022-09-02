from django.urls import path

from . import views

app_name= 'characters'
urlpatterns = [
    #ex: /character/
    path('', views.index, name='index'),
    #ex: /character/1
    path('<int:character_id>/', views.details, name='details'),
    #ex: /character/1/armor
    path('<int:character_id>/armor/', views.armor, name='armor'),
    #ex: /character/1/armor/1
    path('<int:character_id>/armor/<int:armor_id>/', views.armor_details, name='armor_details')
]