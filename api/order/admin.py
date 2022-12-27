from django.contrib import admin

from order.models.orders import Order
from order.models.orderItems import OrderItem


admin.site.register(Order)
admin.site.register(OrderItem)
