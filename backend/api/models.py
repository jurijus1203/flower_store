from django.db import models
from django.conf import settings

class Flower(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_file = models.ImageField(upload_to='flowers_img/', null=True, blank=True)
    in_stock = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.name}, {self.image_file}'
    
    def get_image_url(self):
        if self.image_file:
            return f"{settings.MEDIA_URL}{self.image_file}"
        return None
