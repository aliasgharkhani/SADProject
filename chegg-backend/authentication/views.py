from django.views.generic import CreateView
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from authentication.serializers import MemberSignupSerializer


class MemberSignupAPIView(CreateAPIView):
    serializer_class = MemberSignupSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)


class HelloView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(self.request.data)
        return Response({'s': 'a'})
