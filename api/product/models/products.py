from django.db import models

# LEXERS = [item for item in get_all_lexers() if item[1]]
# LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
# STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])


class Product(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=True, default='')
    price = models.IntegerField(blank=False, default=0)
    in_stock = models.BooleanField(blank=False)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.name
