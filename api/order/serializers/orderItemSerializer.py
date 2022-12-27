from rest_framework import serializers
from order.models.orderItems import OrderItem


class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = '__all__'


    id = serializers.IntegerField(read_only=True)

    def create(self, validated_data):
        """
        Create and return a new `order` instance, given the validated data.
        """
        return OrderItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `order` instance, given the validated data.
        """
        instance.order_id = validated_data.get('order_id', instance.order_id)
        instance.product_id = validated_data.get('product_id', instance.product_id)
        instance.user_id = validated_data.get('user_id', instance.user_id)

        instance.save()
        return instance
