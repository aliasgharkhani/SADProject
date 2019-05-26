from rest_framework import serializers

from authentication.models import Member


class MemberSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=8, style={'input_type': 'password'})

    class Meta:
        model = Member
        fields = ('username', 'email', 'first_name', 'last_name', 'password')

    def create(self, validated_data):
        member = super().create(validated_data)
        member.set_password(validated_data['password'])
        member.save()
        return member
