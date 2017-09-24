import sys

from django.shortcuts import get_object_or_404
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import *
from .serializers import *


# products/
class ProductList(APIView):
    def get_object(self, id):
        try:
            return Product.objects.get(id=id)
        except Product.DoesNotExist:
            raise Http404

    # Returns a list of all products registered
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    # Creates a new product
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        product = self.get_object(request.data['id'])
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Deletes the product with matching id
    def delete(self, request):
        product = self.get_object(request.data['id'])
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# search/name/:name/:maxSize (let maxSize empty to return all products)
class SearchProductsByNameList(APIView):
    # Returns a list of all products which has the name similar to parameter
    def get(self, request, name, maxSize=sys.maxsize):
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


# purchase/
class PurchaseHistoryList(APIView):
    def get_object(self, id):
        try:
            return PurchaseHistory.objects.get(id=id)
        except PurchaseHistory.DoesNotExist:
            raise Http404

    # Creates a new purchase history
    def post(self, request):
        serializer = PurchaseHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Increases the 'ostentação' count by 1
    def put(self, request):
        purchase = self.get_object(request.data['id'])
        purchase.ostentacaoCount += 1
        purchase.save()
        serializer = PurchaseHistorySerializer(purchase)
        return Response(serializer.data)
