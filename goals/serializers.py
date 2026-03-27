from rest_framework import serializers
from .models import Goal, UserGoal

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'