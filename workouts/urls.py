from django.urls import path
from .views import StartWorkoutView, CompleteWorkoutView, DashboardView

urlpatterns = [
    path('start/', StartWorkoutView.as_view()),
    path('complete/', CompleteWorkoutView.as_view()),
    path('dashboard/', DashboardView.as_view()),
]