from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from store.models import Book, PurchaseHistory, Chapter, Problem, Advertisement
from store.serializers import BookSerializer, ChapterSerializer, ProblemSerializer, ProblemWithoutAnswerSerializer, \
    AdvertisementSerializer


class BookViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = BookSerializer
    queryset = Book.objects.all()

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def buy(self, request, pk):
        book = self.get_object()
        member = self.request.user
        if member.has_purchased_book(book):
            return Response({'done': False, 'message': 'شما این کتاب را قبلا خریده اید.'})

        for chapter in book.chapters.all():
            if not PurchaseHistory.objects.filter(member=member, chapter=chapter).exists():
                PurchaseHistory.objects.create(member=member, chapter=chapter)

        return Response({'done': True, 'message': 'خرید با موفقیت انجام شد.'})

    @action(detail=True, methods=['get'])
    def chapters(self, request, pk):
        book = self.get_object()
        data = ChapterSerializer(book.chapters.all(), many=True).data
        return Response(data)


class ChapterViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ChapterSerializer
    queryset = Chapter.objects.all()

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def buy(self, request, pk):
        chapter = self.get_object()
        member = self.request.user
        if member.has_purchased_chapter(chapter):
            return Response({'done': False, 'message': 'شما این فصل را قبلا خریده اید.'})
        PurchaseHistory.objects.create(member=member, chapter=chapter)
        return Response({'done': True, 'message': 'خرید با موفقیت انجام شد.'})


class ProblemAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        book_id = kwargs.get('book_id', -1)
        chapter_id = kwargs.get('chapter_id', -1)
        problem_id = kwargs.get('problem_id', -1)
        book = get_object_or_404(Book, id=book_id)
        chapter = get_object_or_404(Chapter, book=book, chapter_id=chapter_id)
        problem = get_object_or_404(Problem, chapter=chapter, problem_id=problem_id)
        if not self.request.user.is_authenticated or not self.request.user.has_purchased_chapter(chapter):
            return Response(ProblemWithoutAnswerSerializer(problem).data)
        return Response(ProblemSerializer(problem).data)


class AdvertisementAPIView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(AdvertisementSerializer(Advertisement.objects.all(), many=True).data)
