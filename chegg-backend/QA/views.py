from QA.models import Question, Tag, Reply
from QA.serializers import QuestionSerializer, TagSerializer, ReplySerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


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


class BestAnswerAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        reply_id = self.request.data.get('id', None)
        if not reply_id:
            raise ValidationError('آی دی نا معتبر است')
        try:
            reply = Reply.objects.get(id=reply_id)
        except:
            raise ValidationError('آی دی نا معتبر است')
        question_asker = reply.question.creator
        if question_asker != self.request.user:
            raise ValidationError('شما دسترسی به این دستور را ندارید.')
        command = self.request.data.get('command', None)
        if not command:
            raise ValidationError('دستور نامعتبر است')
        if command == "mark":
            question = reply.question
            if question.replies.filter(best=True).exists():
                raise ValidationError('پاسخ دیگری از قبل به عنوان بهترین پاسخ انتخاب شده است.')
            reply.best = True
            reply.save()
        elif command == "unmark":
            if not reply.best:
                raise ValidationError('این جواب قبلا به عنوان بهترین جواب انتخاب نشده است')
            reply.best = False
            reply.save()
        else:
            raise ValidationError('دستور نامعتبر است')
