from django.urls import path
from .views import StartWorkoutView, CompleteWorkoutView

urlpatterns = [
    path('start/', StartWorkoutView.as_view()),
    path('complete/', CompleteWorkoutView.as_view()),
]