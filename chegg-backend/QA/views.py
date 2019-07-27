from QA.models import Question, Tag, Reply, ReplyScore
from QA.serializers import QuestionSerializer, TagSerializer, ReplySerializer
from django.core.exceptions import ObjectDoesNotExist
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

    def get_serializer_context(self):
        return {'request': self.request}

    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticatedOrReadOnly])
    def replies(self, request, pk):
        question = self.get_object()
        return Response(ReplySerializer(question.replies.all(), many=True, context={'request': self.request}).data)


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
        return Response('done')


class ReplyScoreAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        reply_id = kwargs.get('reply_id')
        member = self.request.user
        command = self.request.data.get('command', None)
        if not command:
            raise ValidationError('نوع دستور را مشخص کنید.')
        try:
            reply = Reply.objects.get(id=reply_id)
            if command == 'up':
                try:
                    reply_score = ReplyScore.objects.get(member=member, reply=reply)
                    if reply_score.type == 'up':
                        reply.score -= 1
                        reply.save()
                        reply_score.delete()
                        return Response({'score': reply.score, 'dir': 'neutral'})
                    else:
                        reply_score.type = 'up'
                        reply_score.save()
                        reply.score += 2
                        reply.save()
                        return Response({'score': reply.score, 'dir': 'up'})
                except ObjectDoesNotExist:
                    ReplyScore.objects.create(member=member, reply=reply, type='up')
                    reply.score += 1
                    reply.save()
                    return Response({'score': reply.score, 'dir': 'up'})
            elif command == 'down':
                try:
                    reply_score = ReplyScore.objects.get(member=member, reply=reply)
                    if reply_score.type == 'down':
                        reply.score += 1
                        reply.save()
                        reply_score.delete()
                        return Response({'score': reply.score, 'dir': 'neutral'})
                    else:
                        reply_score.type = 'down'
                        reply_score.save()
                        reply.score -= 2
                        reply.save()
                        return Response({'score': reply.score, 'dir': 'down'})
                except ObjectDoesNotExist:
                    ReplyScore.objects.create(member=member, reply=reply, type='down')
                    reply.score -= 1
                    reply.save()
                    return Response({'score': reply.score, 'dir': 'down'})
            else:
                raise ValidationError('نوع دستور اشتباه است.')
        except:
            raise ValidationError('پاسخ وجود ندارد.')
