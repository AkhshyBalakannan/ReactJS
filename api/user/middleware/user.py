from rest_framework.response import Response
from rest_framework.authtoken.models import Token

def is_authenticated(func):
    def validate_request_user(*args, **kwargs):
        request = args[0]
        print(request.headers)
        authorizations = request.headers.get('Authorizarions')
        valid_user = None
        if authorizations:
            token = authorizations.split(' ')[1]
            valid_user = Token.objects.get(key = token)
        if request.auth or valid_user:
            return func(*args, **kwargs)
  
        else:
            response = {"detail": "Authentication credentials were not provided."}
            return Response(response, 401)
                          
    return validate_request_user
