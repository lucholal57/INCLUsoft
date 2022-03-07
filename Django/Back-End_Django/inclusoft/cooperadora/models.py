from django.db import models

# Create your models here.
class Cooperadora(models.Model):
    caja_chica = models.IntegerField()
   
    def __str__(self):
        return f'Caja chica : {self.caja_chica}'