from product.models.products import Product
from product.serializers.productSerializer import ProductSerializer, ProductSerializer

from rest_framework.decorators import api_view 
from rest_framework.response import Response

@api_view(['GET', 'POST'])
def product_list(request):
    """
    List all products, or create a new product.
    """
    if request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response = {'data': serializer.data}
            return Response(response)
        return Response(serializer.errors)
    serializer = ProductSerializer(Product.objects.all(), many=True)
    response = {'data': serializer.data}
    return Response(response)


@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, pk):
    """
    Retrieve, update or delete a product.
    """
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response('Product Not Found', 404)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        response = {'data': serializer.data}
        return Response(response)

    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            response = {'data': serializer.data}
            return Response(response)
        return Response(serializer.errors, 400)

    elif request.method == 'DELETE':
        product.delete()
        response = {'data': 'Product Deleted Successfully'}
        return Response(response, 204)
