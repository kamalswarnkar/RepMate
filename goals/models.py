from django.db import models
from django.conf import settings

# Create your models here.
class Goal(models.Model):
    code = models.CharField(max_length=50,unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
    
class UserGoal(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE)
    priority = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.user.username} - {self.goal.name}"