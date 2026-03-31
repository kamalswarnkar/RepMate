from django.contrib import admin
from .models import WorkoutSession, ProgressStat
# Register your models here.

admin.site.register(WorkoutSession)
admin.site.register(ProgressStat)