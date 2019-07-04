from QA.models import Question
from rest_framework import serializers


class QuestionSerializer(serializers.ModelSerializer):
    creator = serializers.HiddenField(default=serializers.CurrentUserDefault())

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
