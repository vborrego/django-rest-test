from django.db import models

class Task(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    task = models.CharField(max_length=128, blank=True, default='')
    state = models.CharField(max_length=16, blank=True, default='NEW')
    