import sys

from django.shortcuts import get_object_or_404
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import *
from .serializers import *


# /product
class ProductList(APIView):
    def get_object(self, id):
        try:
            return Product.objects.get(id=id)
        except Product.DoesNotExist:
            raise Http404

    # Creates a new product
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Updates a product
    def put(self, request):
        product = self.get_object(request.data['id'])
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /product/:id
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

    # Increases the "timesBought" value by 1
    def put(self, request, id):
        product = self.get_object(id)
        product.timesBought += 1
        product.save()
        return Response(ProductSerializer(product).data)

    # Deletes the product with matching id
    def delete(self, request, id):
        product = self.get_object(id)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# /allProducts/:maxSize (let maxSize empty to return all)
class AllProductsList(APIView):
    # Returns a list with size maxSize containing the most recent products
    def get(self, request, maxSize=sys.maxsize):
        products = Product.objects.all().order_by('-id')[:int(maxSize)]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


# /allCategories/:maxSize (let maxSize empty to return all)
class AllCategoriesList(APIView):
    # Returns a list of size maxSize containing all the categories
    def get(self, request, maxSize=sys.maxsize):
        products = Product.objects.values('category').distinct()[:int(maxSize)]
        categories = []
        for dict in products:
            categories += [dict['category']]
        return Response(categories)


# search/name/:name/:maxSize (let maxSize empty to return all)
class SearchProductsByNameList(APIView):
    # Returns a list of size maxSize of products which has the name similar to parameter
    def get(self, request, name, maxSize=sys.maxsize):
        products = Product.objects.all().filter(name__contains=name).order_by('-id')[:int(maxSize)]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


# search/category/:category/:maxSize (let maxSize empty to return all)
class SearchProductsByCategoryList(APIView):
    # Returns a list of size maxSize of products which belongs to the past category
    def get(self, request, category, maxSize=sys.maxsize):
        products = Product.objects.all().filter(category__iexact=category).order_by('-id')[:int(maxSize)]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


# search/popular/:maxSize (let maxSize empty to return all)
class SearchProductsByPopularityList(APIView):
    # Returns a list of size maxSize of products sorted by popularity
    def get(self, request, maxSize=sys.maxsize):
        products = Product.objects.all().order_by('-timesBought', '-id')[:int(maxSize)]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


# /purchase/
class PurchaseHistoryList(APIView):
    # Creates a new purchase history
    def post(self, request):
        serializer = PurchaseHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            items = request.data['products']
            for k in items:
                k['idPurchase'] = serializer.data['id']
                itemSerializer = PurchasedProductsSerializer(data=k)
                if itemSerializer.is_valid():
                    itemSerializer.save()
                    product = Product.objects.get(id=k['idProduct'])
                    product.stock -= k['quantity']
                    product.timesBought += 1
                    product.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /purchase/:id
class PurchaseHistoryDetail(APIView):
    def get_object(self, id):
        try:
            return PurchaseHistory.objects.get(id=id)
        except PurchaseHistory.DoesNotExist:
            raise Http404

    # Returns the purchase with matching id
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


# /latestPurchases/:id/:maxSize (let maxSize empty to return all)
class AllPurchaseHistoryDetail(APIView):
    def getProduct(self, pk):
        product = Product.objects.get(id=pk)
        return product

    # Returns the latest purchases of the user with matching id
    def get(self, request, id, maxSize=sys.maxsize):
        purchases = PurchaseHistory.objects.filter(idUser=id).order_by('-id')[:int(maxSize)]
        serializer = PurchaseHistorySerializer(purchases, many=True)
        output = []
        for dict in serializer.data:
            inject = {}
            for k in dict:
                inject[k] = dict[k]
            inject['products'] = []
            purchasedProds = PurchasedProducts.objects.filter(idPurchase=dict['id'])
            items = PurchasedProductsSerializer(purchasedProds, many=True).data
            for pk in items:
                pi = ProductSerializer(self.getProduct(pk['idProduct'])).data
                pi['quantity'] = pk['quantity']

                inject['products'] += [pi]
            output += [inject]
        return Response(output)


# /user/
class UserList(APIView):
    # Creates a new user
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /user/:id
class UserDetail(APIView):
    def get_object(self, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            raise Http404

    # Returns all data of the user with matching id
    def get(self, request, id):
        user = self.get_object(id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
