from django.db import models

# Create your models here.
class HangoutEntry(models.Model):
  # define tag choices
  TAG_CHOICES = {
    "FD": "Food",
    "GM": "Gaming",
    "RC": "Recreation",
    "CH": "Chill",
    "SP": "Sports",
    "PD": "Productive",
    "EV": "Events",
    "ET": "Entertainment",
    "OT": "Others",
  }
  # define fields
  name = models.CharField(max_length=250)
  location = models.CharField(max_length=250)
  google_pin = models.CharField(max_length=250)
  emoji_icon = models.CharField(max_length=1)
  votes = models.IntegerField()
  tag =  models.CharField(max_length=10, choices=TAG_CHOICES, default=TAG_CHOICES['OT'])
  created_at = models.DateTimeField(auto_now_add=True)
  last_edited = models.DateTimeField(auto_now=True)
  is_offlines = models.BooleanField(default=False)
  has_been_done = models.BooleanField(default=False)
  #define main label
  def __str__(self):
    return self.name

class HangoutEntryDev(models.Model):
  # define tag choices
  TAG_CHOICES = {
    "FD": "Food",
    "GM": "Gaming",
    "RC": "Recreation",
    "CH": "Chill",
    "SP": "Sports",
    "PD": "Productive",
    "EV": "Events",
    "ET": "Entertainment",
    "OT": "Others",
  }
  # define fields
  name = models.CharField(max_length=250)
  location = models.CharField(max_length=250)
  google_pin = models.CharField(max_length=250)
  emoji_icon = models.CharField(max_length=1)
  votes = models.IntegerField()
  tag =  models.CharField(max_length=10, choices=TAG_CHOICES, default=TAG_CHOICES['OT'])
  created_at = models.DateTimeField(auto_now_add=True)
  last_edited = models.DateTimeField(auto_now=True)
  is_offlines = models.BooleanField(default=False)
  has_been_done = models.BooleanField(default=False)
  #define main label
  def __str__(self):
    return self.name
