import sys

from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import *
from .serializers import *


# products/
class ProductList(APIView):
    # Returns a list of all products registered
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    # TODO Creates a new product
    def post(self, request):
        print(request.data)
        return Response(200)


# search/name/:name/:maxSize (let maxSize empty to return all products)
class SearchProductsByNameList(APIView):
    # Returns a list of all products which has the name similar to parameter
    def get(self, request, name, maxSize=sys.maxsize):
        print(maxSize)
        products = Product.objects.all().filter(name__contains=name).order_by('-id')[:int(maxSize)]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


# search/category/:category/:maxSize (let maxSize empty to return all products)
class SearchProductsByCategoryList(APIView):
    # Returns a list of all products which belongs to the past category
    def get(self, request, category, maxSize=sys.maxsize):
        products = Product.objects.all().filter(category__iexact=category).order_by('-id')[:int(maxSize)]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


# search/popular/:maxSize (let maxSize empty to return all products)
class SearchProductsByPopularityList(APIView):
    # Returns a list of all products sorted by popularity
    def get(self, request, maxSize=sys.maxsize):
        products = Product.objects.all().order_by('-timesBought', '-id')[:int(maxSize)]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
