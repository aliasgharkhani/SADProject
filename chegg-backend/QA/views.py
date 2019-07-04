from QA.models import Question
from QA.serializers import QuestionSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class QuestionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
