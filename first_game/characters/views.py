from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse

from .models import Character

# Create your views here.
def index(request):
    character_list = Character.objects.order_by('-name')
    context = {'character_list': character_list}
    return render(request, 'characters/index.html', context)

def details (request, character_id):
    character = get_object_or_404(Character, pk=character_id)
    return render(request, 'characters/detail.html', {'character': character})
