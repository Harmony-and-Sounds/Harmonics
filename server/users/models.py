from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    id = models.AutoField(primary_key = True)
    user = models.ForeignKey(User , on_delete= models.CASCADE )
    pending_notifications = models.BooleanField(default= False)


# Create your models here.
