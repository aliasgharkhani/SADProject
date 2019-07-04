from rest_framework import serializers
from store.models import Book, Problem, Chapter


class BookSerializer(serializers.ModelSerializer):
    chapters = serializers.SerializerMethodField()

    def get_chapters(self, obj):
        return ChapterSerializer(obj.chapters.all(), many=True).data

    class Meta:
        model = Book
        exclude = ()


class ChapterSerializer(serializers.ModelSerializer):
    problems = serializers.SerializerMethodField()

    def get_problems(self, obj):
        return ProblemSerializer(obj.problems.all(), many=True).data

    class Meta:
        model = Chapter
        exclude = ()


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        exclude = ()


class ProblemWithoutAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        exclude = ('answer',)
