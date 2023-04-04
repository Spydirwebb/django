from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.generics import RetrieveAPIView, CreateAPIView 
from rest_framework import permissions
from reviews.serializers import (
	UserSerializer, GroupSerializer, 
	ReviewReadSerializer, ReviewWriteSerializer, 
	BusinessReadSerializer, BusinessWriteSerializer, 
	CategoryReadSerializer, CategoryWriteSerializer,
	RegisterUserSerializer
)
from reviews.models import Review, Business, Category
from django_filters.rest_framework import DjangoFilterBackend

# edit user models
class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all().order_by('-date_joined')
	serializer_class = UserSerializer
	permission_classes = [permissions.IsAuthenticated] # must be logged in to access routes

class GroupViewSet(viewsets.ModelViewSet):
	queryset = Group.objects.all()
	serializer_class = GroupSerializer
	permission_classes = [permissions.IsAuthenticated]

class ReviewViewSet(viewsets.ModelViewSet):
	queryset = Review.objects.all()
	permission_classes = [permissions.AllowAny]
	def get_serializer_class(self):
		if self.request.method =='PUT' or self.request.method == 'POST':
			return ReviewWriteSerializer
		else:
			return ReviewReadSerializer

class BusinessViewSet(viewsets.ModelViewSet):
	queryset = Business.objects.all()
	filter_backends = [DjangoFilterBackend]
	filterset_fields = ['slug']
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	def get_serializer_class(self):
		if self.request.method =='PUT' or self.request.method == 'POST':
			return BusinessWriteSerializer
		else:
			return BusinessReadSerializer

class CategoryViewSet(viewsets.ModelViewSet):
	queryset = Category.objects.all()
	filter_backends = [DjangoFilterBackend]
	filterset_fields = ['slug']
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	def get_serializer_class(self):
		if self.request.method =='PUT' or self.request.method == 'POST':
			return CategoryWriteSerializer
		else:
			return CategoryReadSerializer

# get logged in user
class UserAPIView(RetrieveAPIView): #read only
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = UserSerializer

	def get_object(self):
		return self.request.user

class RegisterUserAPIView(CreateAPIView): #write only
	permission_classes = [permissions.AllowAny()] #any public user can use
	serializer_class = RegisterUserSerializer