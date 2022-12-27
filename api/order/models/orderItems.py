from django.db import models

from order.models.orders import Order
from product.models.products import Product


class OrderItem(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.PROTECT)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return '%d: %s, %s' % (self.id, self.created.date(), self.product_id.name)
