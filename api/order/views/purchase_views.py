from order.models.orderItems import OrderItem
from order.serializers.orderItemSerializer import OrderItemSerializer

from order.models.orders import Order
from order.serializers.orderSerializer import OrderSerializer
from rest_framework import status

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view 
from rest_framework.response import Response

from user.middleware.user import is_authenticated

@api_view(['GET', 'POST'])
def purchase(request):
    """
    List all Order_items, or create a new Order_items.
    """
    if request.method == 'GET':
        serializer = OrderItemSerializer(OrderItem.objects.all(), many=True)
        response = {'data': serializer.data}
        return Response(response)
    data = request.data
    serializer = OrderItemSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        response = {'data': serializer.data}
        return Response(response)
    return Response(serializer.errors)


@api_view(['POST'])
def purchase(request):
    """
    List all Order_items, or create a new Order_items.
    """
    data = request.data

    serializer = OrderItemSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        response = {'data': serializer.data}
        return Response(response)
    return Response(serializer.errors)


# @sync_to_async
@api_view(['POST'])
@is_authenticated
def orderEntry(request):
    order = Order.objects.create(user_id=request.user)
    for data_entry in request.data['data_entry']:
        data_entry['order'] = order.id
        serializer = OrderItemSerializer(data=data_entry)
        if not serializer.is_valid():
            order.delete()
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    for data_entry in request.data['data_entry']:
        serializer = OrderItemSerializer(data=data_entry)
        if serializer.is_valid():
            serializer.save()
        else:
            order.delete()
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(request.data, status=status.HTTP_201_CREATED)
