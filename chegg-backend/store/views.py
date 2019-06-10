from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from store.models import Book
from store.serializers import BookSerializer


class BookViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = BookSerializer
    queryset = Book.objects.all()

