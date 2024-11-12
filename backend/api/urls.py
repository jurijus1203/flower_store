from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FlowerViewSet

router = DefaultRouter()
router.register(r'flowers', FlowerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

