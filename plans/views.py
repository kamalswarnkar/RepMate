from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import date
from .models import WorkoutDay, WorkoutPlan
from .utils import generate_plan
from .serializers import WorkoutPlanSerializer
from django.shortcuts import render

# Create your views here.
class GeneratePlanView(APIView):
    def post(Self, request):
        user = request.user

        plan_data = generate_plan(user)

        plan = WorkoutPlan.objects.create(user=user, week_start=date.today())

        for day in plan_data:
            WorkoutDay.objects.create(
                plan = plan,
                day_number = day['day'],
                focus = day['focus'],
                exercises = day['exercises']
            )
        
        serializer = WorkoutPlanSerializer(plan)
        
        return Response(serializer.data)

class CurrentPlanView(APIView):
    def get(self, request):
        user = request.user

        plan = WorkoutPlan.objects.filter(user=user).order_by('-week_start').first()

        if not plan:
            return Response({"message" : "Plan not found"})
        
        serializer = WorkoutPlanSerializer(plan)

        return Response(serializer.data)
    
class TodayWorkoutView(APIView):
    def get(self, request):
        user = request.user

        plan = WorkoutPlan.objects.filter(user=user).order_by('-week_start').first()

        if not plan:
            return Response({"message" : "Plan not found"})
        
        today_index = (date.today - plan.week_start).days + 1
        workout_day = WorkoutDay.objects.filter(plan=plan, day_number=today_index).first()

        if not workout_day:
            return Response({"message" : "Rest Day!!"})
        
        data = {
            "day" : workout_day.day_number,
            "focus" : workout_day.focus,
            "exercises" : workout_day.exercises
        }

        return Response(data)
    