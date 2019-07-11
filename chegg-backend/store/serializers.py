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
        return ProblemWithoutAnswerSerializer(obj.problems.all(), many=True).data

    class Meta:
        model = Chapter
        exclude = ()


class ProblemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Problem
        exclude = ()

    def to_representation(self, instance):
        representation = super(ProblemSerializer, self).to_representation(instance)
        domain_name = "http://127.0.0.1:8000"
        representation['answer'] = domain_name + instance.answer.url
        representation['answer_blurred'] = domain_name + instance.answer_blurred.url
        return representation


class ProblemWithoutAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        exclude = ('answer_blurred',)

    def to_representation(self, instance):
        representation = super(ProblemWithoutAnswerSerializer, self).to_representation(instance)
        domain_name = "http://127.0.0.1:8000"
        representation['answer'] = domain_name + instance.answer_blurred.url
        return representation
