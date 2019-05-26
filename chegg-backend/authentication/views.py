from django.views.generic import CreateView
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from authentication.serializers import MemberSignupSerializer


class MemberSignupAPIView(CreateAPIView):
    serializer_class = MemberSignupSerializer


class HelloView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(self.request.data)
        return Response({'s': 'a'})
