from QA.models import Question, Tag, Reply
from QA.serializers import QuestionSerializer, TagSerializer, ReplySerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response


class QuestionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()

    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticatedOrReadOnly])
    def replies(self, request, pk):
        question = self.get_object()
        return Response(ReplySerializer(question.replies.all(), many=True).data)


class TagListAPIView(ListAPIView):
    serializer_class = TagSerializer
    permission_classes = []
    queryset = Tag.objects.all()


class ReplyCreateAPIView(CreateAPIView):
    serializer_class = ReplySerializer
    permission_classes = [IsAuthenticated]
    queryset = Reply.objects.all()
