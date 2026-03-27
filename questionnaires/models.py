from django.db import models
from django.conf import settings

# Create your models here.
class QuestionnaireResponse(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    answers = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
