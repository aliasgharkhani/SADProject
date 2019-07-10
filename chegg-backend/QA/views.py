from QA.models import Question, Tag
from QA.serializers import QuestionSerializer, TagSerializer
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class QuestionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()


class TagListAPIView(ListAPIView):
    serializer_class = TagSerializer
    permission_classes = []
    queryset = Tag.objects.all()
