from rest_framework import serializers
from store.models import Book, Problem, Chapter


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        exclude = ()


class ChapterSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = Chapter
        exclude = ()


class ProblemSerializer(serializers.ModelSerializer):
    chapter = ChapterSerializer()

    class Meta:
        model = Problem
        exclude = ()
