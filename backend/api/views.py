from rest_framework import viewsets
from .models import Flower
from .serializers import FlowerSerializer

class FlowerViewSet(viewsets.ModelViewSet):
    queryset = Flower.objects.all()
    serializer_class = FlowerSerializer
