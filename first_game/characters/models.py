from django.db import models

# Create your models here.
class Character(models.Model):
    name = models.CharField(max_length=20)
    level = models.IntegerField(default=1)
    nextLevelExp = models.IntegerField(default=100)
    currentExp = models.IntegerField(default=0)
    maxHealth = models.IntegerField(default=0)
    currentHealth = models.IntegerField(default=0)
    maxMana = models.IntegerField(default=0)
    currentMana = models.IntegerField(default=0)
    attack = models.IntegerField(default=0)
    defense = models.IntegerField(default=0)
    '''
    name = models.CharField(max_length=20)
    level = models.IntegerField(default=1)
    nextLevelExp = models.IntegerField(default=100)
    currentExp = models.IntegerField(default=0)
    maxHealth = models.IntegerField(default= (10 * Character.level))
    currentHealth = models.IntegerField(default=maxHealth)
    maxMana = models.IntegerField(default= (5 * level))
    currentMana = models.IntegerField(default=maxMana)
    attack = models.IntegerField(default= (3 * level))
    defense = models.IntegerField(default=level)
    '''

    def __str__(self):
        return self.name

class Armor(models.Model):
    belongs_to = models.ForeignKey(to=Character, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    attack = models.IntegerField(default=0)
    defense = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Weapon(models.Model):
    belongs_to = models.ForeignKey(to=Character, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    attack = models.IntegerField(default=0)
    defense = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Skill(models.Model):
    belongs_to = models.ForeignKey(to=Character, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    attack = models.IntegerField(default=0)
    cost = models.IntegerField(default=0)

    def __str__(self):
        return self.name
    