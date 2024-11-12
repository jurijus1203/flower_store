from rest_framework import serializers
from .models import Flower

class FlowerSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Flower
        fields = '__all__'

    def get_image_url(self, obj):
        return obj.get_image_url()
