from django.db import models

from django.contrib.auth.models import User


class Order(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)


    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.user_id.username
