from django.contrib import admin
from .models import WorkoutDay, WorkoutPlan
# Register your models here.

admin.site.register(WorkoutDay)
admin.site.register(WorkoutPlan)