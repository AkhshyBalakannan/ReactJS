"""ecommerce URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from order.views.order_views import order_list, order_detail, user_order_list
from order.views.purchase_views import purchase, orderEntry

urlpatterns = [
    path('orders/', order_list),
    path('order/<pk>', order_detail),

    path('my-order/', user_order_list),

    path('purchase/', orderEntry),
]
