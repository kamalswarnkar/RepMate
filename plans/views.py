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