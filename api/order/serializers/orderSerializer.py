from rest_framework import serializers
from order.models.orders import Order


class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.StringRelatedField(many=True)

    class Meta:
        model = Order
        fields = '__all__'


    id = serializers.IntegerField(read_only=True)

    def create(self, validated_data):
        """
        Create and return a new `order` instance, given the validated data.
        """
        return Order.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `order` instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance
