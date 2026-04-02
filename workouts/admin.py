from django.contrib import admin
from .models import WorkoutSession, ProgressStat, Exercise
# Register your models here.

admin.site.register(WorkoutSession)
admin.site.register(ProgressStat)
admin.site.register(Exercise)