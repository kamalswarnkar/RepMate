from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Goal
from .serializers import GoalSerializer
from django.shortcuts import render

# Create your views here.
class GoalListView(APIView):
    def get(self, request):
        goals = Goal.objects.all()
        serializer = GoalSerializer(goals, many=True)
        
        return Response(serializer  .data)