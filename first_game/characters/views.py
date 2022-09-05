from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.views import generic

from .models import Character, Armor, Weapon, Skill

# Create your views here.
class IndexView(generic.ListView):
    template_name = 'characters/index.html'
    context_object_name = 'character_list'

    def get_queryset(self):
        '''return list of characters'''
        return Character.objects.all()

def details (request, character_id):
    #get Character
    character = get_object_or_404(Character, pk=character_id)
    
    #getArmor
    try:
        armor = Armor.objects.get(belongs_to=character_id) 
    except Armor.DoesNotExist:
        armor = None
    #getWeapon
    try:
        weapon = Weapon.objects.get(belongs_to=character_id)
    except Weapon.DoesNotExist:
        weapon = None
    #get Skill
    try:
        skill = Skill.objects.get(belongs_to=character_id)
    except Skill.DoesNotExist:
        skill = None

    context = {'character': character,
                'armor': armor,
                'weapon': weapon,
                'skill': skill
                }
    return render(request, 'characters/detail.html', context)

def armor(request, character_id):
    armor_list = Armor.objects.all().filter(pk=1)
    context = {'armor_list': armor_list}
    return render(request, 'armors/index.html', context)

def armor_details(request, character_id, armor_id):
    armor = get_object_or_404(Armor, pk=armor_id, fk=character_id)
    return render(request, 'armors/detail.html', {'armor': armor})

def fight(request, character_id):
    character = get_object_or_404(Character, pk=character_id)
    character.currentExp += 5
    character.save()
    return HttpResponseRedirect(reverse('characters:details', args=(character.id,)))

