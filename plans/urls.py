from django.urls import path
from .views import GeneratePlanView, CurrentPlanView, TodayWorkoutView

urlpatterns = [
    path('generate/', GeneratePlanView.as_view()),
    path('current/', CurrentPlanView.as_view()),
    path('today', TodayWorkoutView.as_view()),
]