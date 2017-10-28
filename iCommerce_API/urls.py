from django.conf.urls import url
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns

from API import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/product/(?P<id>[0-9]+)$', views.ProductDetail.as_view()),
    url(r'^api/product$', views.ProductList.as_view()),

    url(r'^api/allProducts/(?P<maxSize>[0-9]+)$', views.AllProductsList.as_view()),
    url(r'^api/allProducts$', views.AllProductsList.as_view()),

    url(r'^api/allCategories/(?P<maxSize>[0-9]+)$', views.AllCategoriesList.as_view()),
    url(r'^api/allCategories', views.AllCategoriesList.as_view()),

    url(r'^api/search/name/(?P<name>.+)/(?P<maxSize>[0-9]+)$', views.SearchProductsByNameList.as_view()),
    url(r'^api/search/name/(?P<name>.+)$', views.SearchProductsByNameList.as_view()),

    url(r'^api/search/category/(?P<category>.+)/(?P<maxSize>[0-9]+)$', views.SearchProductsByCategoryList.as_view()),
    url(r'^api/search/category/(?P<category>.+)$', views.SearchProductsByCategoryList.as_view()),
    url(r'^api/search/category$', views.SearchProductsByCategoryList.as_view()),

    url(r'^api/search/popular/(?P<maxSize>[0-9]+)$', views.SearchProductsByPopularityList.as_view()),
    url(r'^api/search/popular$', views.SearchProductsByPopularityList.as_view()),

    url(r'^api/purchase/(?P<id>[0-9]+)$', views.PurchaseHistoryDetail.as_view()),
    url(r'^api/purchase$', views.PurchaseHistoryList.as_view()),

    url(r'^api/user/(?P<username>[a-zA-Z0-9_]*)$', views.UserDetail.as_view()),
    url(r'^api/user$', views.UserList.as_view()),

    url(r'^api/latestPurchases/(?P<username>[a-zA-Z0-9_]*)/(?P<maxSize>[0-9]+)$', views.AllPurchaseHistoryDetail.as_view()),
    url(r'^api/latestPurchases/(?P<username>[a-zA-Z0-9_]*)$', views.AllPurchaseHistoryDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
