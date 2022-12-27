from rest_framework import serializers
from product.models.products import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'created', 'name', 'price', 'in_stock']

    def create(self, validated_data):
        """
        Create and return a new `order` instance, given the validated data.
        """
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `order` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.price = validated_data.get('price', instance.price)
        instance.in_stock = validated_data.get('in_stock', instance.in_stock)

        instance.save()
        return instance
