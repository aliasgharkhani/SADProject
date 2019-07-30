from authentication.models import Member, Message
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class MemberSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=8, style={'input_type': 'password'})
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=Member.objects.all())]
    )

    class Meta:
        model = Member
        fields = ('username', 'email', 'first_name', 'last_name', 'password')

    def create(self, validated_data):
        member = super().create(validated_data)
        member.set_password(validated_data['password'])
        member.save()
        return member


class MemberBaseInfoSerializer(serializers.ModelSerializer):
    date_joined = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = ('bio', 'first_name', 'last_name', 'username', 'email', 'date_joined')

    def get_date_joined(self, obj):
        return obj.date_joined.date()


class MemberProfileSerializer(serializers.ModelSerializer):
    bought_books = serializers.SerializerMethodField()
    bought_chapters = serializers.SerializerMethodField()
    user_info = serializers.SerializerMethodField()
    asked_questions = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()
    messages = serializers.SerializerMethodField()
    replied_questions = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = ('user_info', 'bought_books', 'bought_chapters', 'asked_questions', 'replies', 'messages', 'is_active',
                  'replied_questions')

    def get_messages(self, obj):
        return MessageSerializer(obj.get_messages(), many=True).data

    def get_bought_books(self, obj):
        from store.serializers import BookSerializer
        return BookSerializer(obj.get_bought_books(), many=True).data

    def get_bought_chapters(self, obj):
        from store.serializers import ChapterSerializer
        return ChapterSerializer(obj.get_bought_chapters(), many=True).data

    def get_user_info(self, obj):
        return MemberBaseInfoSerializer(obj).data

    def get_replied_questions(self, obj):
        from QA.serializers import QuestionSerializer
        return QuestionSerializer(obj.get_replied_questions(), many=True).data

    def get_asked_questions(self, obj):
        from QA.serializers import QuestionSerializer
        return QuestionSerializer(obj.get_asked_questions(), many=True).data

    def get_replies(self, obj):
        from QA.serializers import ReplySerializer
        return ReplySerializer(obj.get_replies(), many=True).data


class MemberPageSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    asked_questions = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()
    replied_questions = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = ('user_info', 'asked_questions', 'replies', 'is_active', 'replied_questions')

    def get_user_info(self, obj):
        return MemberBaseInfoSerializer(obj).data

    def get_replied_questions(self, obj):
        from QA.serializers import QuestionSerializer
        return QuestionSerializer(obj.get_replied_questions(), many=True).data

    def get_asked_questions(self, obj):
        from QA.serializers import QuestionSerializer
        return QuestionSerializer(obj.get_asked_questions(), many=True).data

    def get_replies(self, obj):
        from QA.serializers import ReplySerializer
        return ReplySerializer(obj.get_replies(), many=True).data


class MessageSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()

    def get_date(self, obj):
        return str(obj.date.date())

    class Meta:
        model = Message
        fields = '__all__'
