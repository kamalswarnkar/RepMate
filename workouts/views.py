from rest_framework.views import APIView
from rest_framework.response import Response
from .models import WorkoutSession, ProgressStat, Exercise, PostureSession
from plans.models import WorkoutDay
from .serializers import ExerciseSerializer
from .utils import update_progress
from django.shortcuts import render
import random

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
    
class DashboardView(APIView):
    def get(self, request):
            user = request.user

            stat = ProgressStat.objects.filter(user=user).first()
            total_workouts = WorkoutSession.objects.filter(user=user, completed=True).count()

            data = {
                 "streak" : stat.streak if stat else 0,
                 "xp" : stat.xp if stat else 0,
                 "level" : stat.level if stat else 1,
                 "total_workouts" : total_workouts
            }

            return Response(data)

class ExerciseListView(APIView):
     def get(self, request):
          exercises = Exercise.objects.all()
          serializer = ExerciseSerializer(exercises, many=True)

          return Response(serializer.data)

class PostureCheckView(APIView):
     def post(self, request):
          user = request.user
          exercise = request.data.get('exercise')

          score = random.uniform(60, 100)
          feedback = "Good Form" if score > 80 else "Keep your back straight!"


          session = PostureSession.objects.create(
               user = user,
               exercise_name = exercise,
               score = score,
               feedback = feedback
          )

          return Response({
               "score" : score,
               "feedback" : feedback
          })