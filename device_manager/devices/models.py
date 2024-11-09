from django.db import models

# Create your models here.


class Device(models.Model):
    DEVICE_TYPES = [
        ('Router', 'Router'),
        ('Switch', 'Switch'),
        ('Server', 'Server'),
    ]

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50, choices=DEVICE_TYPES)
    ip_address = models.GenericIPAddressField()
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name