from django.urls import path
from .views import StartWorkoutView, CompleteWorkoutView, DashboardView, ExerciseListView

urlpatterns = [
    path('start/', StartWorkoutView.as_view()),
    path('complete/', CompleteWorkoutView.as_view()),
    path('dashboard/', DashboardView.as_view()),
    path('exercises/', ExerciseListView.as_view()), 
]