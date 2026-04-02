from django.urls import path
from .views import StartWorkoutView, CompleteWorkoutView, DashboardView, ExerciseListView, PostureCheckView

urlpatterns = [
    path('start/', StartWorkoutView.as_view()),
    path('complete/', CompleteWorkoutView.as_view()),
    path('dashboard/', DashboardView.as_view()),
    path('exercises/', ExerciseListView.as_view()),
    path('posture/check/', PostureCheckView.as_view()),
]