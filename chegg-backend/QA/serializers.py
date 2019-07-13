from QA.models import Question, Tag
from rest_framework import serializers


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        exclude = ()


class QuestionSerializer(serializers.ModelSerializer):
    creator = serializers.HiddenField(default=serializers.CurrentUserDefault())
    tags_with_names = serializers.SerializerMethodField()
    asker = serializers.SerializerMethodField()

    def get_tags_with_names(self, obj):
        return TagSerializer(obj.tags.all(), many=True).data

    def get_asker(self, obj):
        return obj.creator.username

    class Meta:
        model = Question
        exclude = ()
        extra_kwargs = {
            "title": {
                "error_messages": {
                    "required": "این فیلد الزامی است.",
                    "max_length": "تعداد کاراکترها بیش از حد مجاز است."
                }
            },
            "body": {
                "error_messages": {
                    "required": "این فیلد الزامی است.",
                    "max_length": "تعداد کاراکترها بیش از حد مجاز است."
                }
            }
        }

    def validate_creator(self, member):
        if not member.is_able_to_ask():
            raise serializers.ValidationError(
                'شما به حد مجاز پرسش سوال رسیده اید. برای پرسش سوال بیشتر به پریمیوم ارتقا دهید.')
        return member
