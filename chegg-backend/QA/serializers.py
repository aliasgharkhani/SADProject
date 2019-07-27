from QA.models import Question, Tag, Reply, ReplyScore
from rest_framework import serializers


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        exclude = ()


class QuestionSerializer(serializers.ModelSerializer):
    creator = serializers.HiddenField(default=serializers.CurrentUserDefault())
    tags_with_names = serializers.SerializerMethodField()
    is_answered = serializers.SerializerMethodField()
    num_of_replies = serializers.SerializerMethodField()
    asker = serializers.SerializerMethodField()
    # description = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()

    def get_date(self, obj):
        return obj.date.date()

    # def get_description(self, obj):
    #     return obj.body

    def get_is_answered(self, obj):
        return obj.replies.filter(best=True).exists()

    def get_num_of_replies(self, obj):
        return obj.replies.all().count()

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
            "description": {
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


class ReplySerializer(serializers.ModelSerializer):
    creator = serializers.HiddenField(default=serializers.CurrentUserDefault())
    member_score = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()
    asker = serializers.SerializerMethodField()

    def get_asker(self, obj):
        return str(obj.creator)

    def get_date(self, obj):
        return obj.date.date()

    def get_member_score(self, obj):
        try:
            requesting_member = self.context['request']
        except:
            return 0
        try:
            reply_score = ReplyScore.objects.get(reply=obj, member=requesting_member)
            if reply_score.type == 'up':
                return 1
            else:
                return -1
        except:
            return 0

    class Meta:
        model = Reply
        exclude = ()

    extra_kwargs = {
        "description": {
            "error_messages": {
                "required": "این فیلد الزامی است.",
                "max_length": "تعداد کاراکترها بیش از حد مجاز است."
            }
        }
    }
