from django.db import models
from django.conf import settings
# Create your models here.

class WorkoutPlan(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    week_start = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

class WorkoutDay(models.Model):
    plan = models.ForeignKey(WorkoutPlan, on_delete=models.CASCADE, related_name='days')
    day_number = models.IntegerField()
    focus = models.CharField(max_length=100)
    exercises = models.JSONField()