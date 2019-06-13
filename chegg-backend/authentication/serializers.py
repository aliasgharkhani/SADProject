from authentication.models import Member
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


class MemberProfileSerializer(serializers.ModelSerializer):
    bought_books = serializers.SerializerMethodField()
    bought_chapters = serializers.SerializerMethodField()

    class Meta:
        model = Member
        exclude = (
        'password', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')

    def get_bought_books(self, obj):
        from store.serializers import BookSerializer
        return BookSerializer(obj.get_bought_books(), many=True).data

    def get_bought_chapters(self, obj):
        from store.serializers import ChapterSerializer
        return ChapterSerializer(obj.get_bought_chapters(), many=True).data
