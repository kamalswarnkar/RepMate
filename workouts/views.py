from rest_framework.views import APIView
from rest_framework.response import Response
from .models import WorkoutSession
from plans.models import WorkoutDay
from .utils import update_progress
from django.shortcuts import render

# Create your views here.

class StartWorkoutView(APIView):
    def post(self, request):
        user = request.user

        day_id = request.data.get('day_id')
        workout_day = WorkoutDay.objects.get(id=day_id)

        session = WorkoutSession.objects.create(user=user, workout_day=workout_day)

        return Response({"message" : "Workout started", "session_id" : session.id})
    
class CompleteWorkoutView(APIView):
    def post(self, request):
        user = request.user
        session_id = request.data.get('session_id')
        session = WorkoutSession.objects.get(id=session_id)
        session.completed = True
        session.completion_pct = 100

        session.save()

        update_progress(user)

        return Response({"message" : "Workout completed"})