from rest_framework import serializers
from .models import QuestionnaireResponse

class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionnaireResponse
        fields = ['user', 'answers']
        