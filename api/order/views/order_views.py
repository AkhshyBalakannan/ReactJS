from order.models.orders import Order
from order.serializers.orderSerializer import OrderSerializer

from django.views.decorators.csrf import csrf_exempt

# from rest_framework.parsers import JSONParser
# from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view 
from rest_framework.response import Response


@api_view(['GET', 'POST'])
def order_list(request):
    """
    List all Order, or create a new Order.
    """
    if request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, 400)
    # return JsonResponse(serializer.errors, status=400)


    serializer = OrderSerializer(Order.objects.all(), many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def order_detail(request, pk):
    """
    Retrieve, update or delete a Order.
    """
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response('Order Not Found', 404)

    if request.method == 'GET':
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, 400)

    elif request.method == 'DELETE':
        order.delete()
        return Response('Deleted Successfully', 204)

@api_view(['GET'])
def user_order_list(request):
    """
    List all Order, or create a new Order.
    """
    serializer = OrderSerializer(Order.objects.filter(user_id=request.user.id), many=True)
    return Response(serializer.data)
