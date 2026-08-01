from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Category
from .serializers import CategorySerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters


# Create your views here.
class CategoryListCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter,filters.OrderingFilter]
    fileterset_fields = ['name', 'icon', 'color']
    ordering_fields = ['name', 'created_at']
    search_fields = ['name', 'icon', 'color']
    ordering = ['name']  # Default ordering by name

    def get_queryset(self):
        return Category.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(owner=self.request.user)