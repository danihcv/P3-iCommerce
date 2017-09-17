from django.db import models


class User(models.Model):
    id = models.IntegerField(primary_key=True)
    type = models.CharField(max_length=20)

    def __str__(self):
        return str(self.id) + ' - ' + self.type
