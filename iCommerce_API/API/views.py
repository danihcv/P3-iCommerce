import sys

from django.shortcuts import get_object_or_404
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import *
from .serializers import *


# product/
class ProductList(APIView):
    # Creates a new product
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# product/:id
class ProductDetail(APIView):
    def get_object(self, id):
        try:
            return Product.objects.get(id=id)
        except Product.DoesNotExist:
            raise Http404

    # Returns the product with matching id
    def get(self, request, id):
        products = self.get_object(id)
        serializer = ProductSerializer(products, many=False)
        return Response(serializer.data)

    def put(self, request, id):
        product = self.get_object(id)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Deletes the product with matching id
    def delete(self, request, id):
        product = self.get_object(id)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# allProducts/:maxSize
class AllProductsList(APIView):
    # Returns a list with size maxSize containing the most recent products
    def get(self, request, maxSize=sys.maxsize):
        products = Product.objects.all().order_by('-id')[:int(maxSize)]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


# allCategories/:maxSize
class AllCategoriesList(APIView):
    # Returns a list with size maxSize containing all the categories
    def get(self, request, maxSize=sys.maxsize):
        products = Product.objects.values('category').distinct()[:int(maxSize)]
        categories = []
        for dict in products:
            categories += [dict['category']]
        return Response(categories)


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
    # Creates a new purchase history
    def post(self, request):
        serializer = PurchaseHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# purchase/:id
class PurchaseHistoryDetail(APIView):
    def get_object(self, id):
        try:
            return PurchaseHistory.objects.get(id=id)
        except PurchaseHistory.DoesNotExist:
            raise Http404

    def get(self, request, id):
        purchase = self.get_object(id)
        serializer = PurchaseHistorySerializer(purchase)
        return Response(serializer.data)

    # Increases the 'ostentação' count by 1
    def put(self, request, id):
        purchase = self.get_object(id)
        purchase.ostentacaoCount += 1
        purchase.save()
        serializer = PurchaseHistorySerializer(purchase)
        return Response(serializer.data)


# latestPurchases/:id/:maxSize
class AllPurchaseHistoryDetail(APIView):
    def get(self, request, id, maxSize=sys.maxsize):
        purchases = PurchaseHistory.objects.filter(idUser=id).order_by('-id')[:int(maxSize)]
        serializer = PurchaseHistorySerializer(purchases, many=True)
        return Response(serializer.data)


# user/
class UserList(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# user/:id
class UserDetail(APIView):
    def get_object(self, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, id):
        user = self.get_object(id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
