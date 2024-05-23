import json
import time
from .dummy_data import dummy_data
from django.http import JsonResponse
from django.shortcuts import HttpResponse
from .models import HangoutEntry, HangoutEntryDev
from django.core import serializers

def create_hangout(request):
  try:
    #ensure correct http verb
    if request.method != "POST":
      return HttpResponse("This is a POST endpoint", status=405)
    #get json palyload
    json_payload = json.loads(request.body)
    # create new entry
    new_hangout = HangoutEntry(
      name = json_payload['name'],
      location = json_payload['location'],
      google_pin = json_payload['googlePin'],
      emoji_icon = json_payload['emojiIcon'],
      votes = json_payload['votes'],
      tag =  json_payload['tag'],
      created_at = time.time(),
      last_edited = time.time(),
      is_offline = json_payload['isOffline'],
      has_been_done = json_payload['hasBeenDone']
    )
    #save new entry
    new_hangout.save()
    # return all a-okay
    return HttpResponse("Entry added successfull")
  except Exception as e: 
    print("Error Occured:", e)
    return HttpResponse(e, status=500)

def read_all(request):
  try:
    #ensure correct http verb
    if request.method != "GET":
      return HttpResponse("This is a GET endpoint", status=405)
    # get all objects
    all_hangouts = HangoutEntry.objects.all()
    # convert to json
    returning_json = serializers.serialize('json', all_hangouts)
    # return okay http
    return HttpResponse(returning_json, content_type="application/json")
  except Exception as e:
    print("Error Occured:", e)
    return HttpResponse(e, status=500)


def read_one(request, pk):
  try:
    #ensure correct http verb
    if request.method != "GET":
      return HttpResponse("This is a GET endpoint", status=405)
    # get object
    hangout = HangoutEntry.objects.get(pk=pk)
    hangout_serialized = serializers.serialize('json', [hangout])
    return HttpResponse(hangout_serialized, content_type="application/json")
  except Exception as e:
    print('error:', e)
    return HttpResponse(e, status=500)


def update_one(request, pk):
  try:
    #ensure correct http verb
    if request.method != "PUT":
      return HttpResponse("This is a PUT endpoint", status=405)
    # read payload
    new_parameters = json.loads(request.body)
    # get object reference
    hangout_to_edit = HangoutEntry.objects.get(pk=pk)
    # edit object reference
    hangout_to_edit.name = new_parameters['name']
    hangout_to_edit.location = new_parameters['location']
    hangout_to_edit.google_pin = new_parameters['googlePin']
    hangout_to_edit.emoji_icon = new_parameters['emojiIcon']
    hangout_to_edit.votes = new_parameters['votes']
    hangout_to_edit.tag =  new_parameters['tag']
    hangout_to_edit.last_edited = time.time()
    hangout_to_edit.is_offline = new_parameters['isOffline']
    hangout_to_edit.has_been_done = new_parameters['hasBeenDone']
    # save edit
    hangout_to_edit.save()
    # return all a-okay
    return HttpResponse("Entry updated")
  except Exception as e:
    print('error:', e)
    return HttpResponse(e, status=500)

def delete_one(request, pk):
  try:
    #ensure correct http verb
    if request.method != "DELETE":
      return HttpResponse("This is a DELETE endpoint", status=405)
    # get object
    hangout = HangoutEntry.objects.get(pk=pk)
    # delete
    hangout.delete()
    # return all a-okay
    return HttpResponse("deleted")
  except Exception as e:
    print('error:', e)
    return HttpResponse(e, status=500)




## ---------- only for development

def dev_delete_all(request):
  #ensure correct http verb
  if request.method != "DELETE":
    return HttpResponse("This is a DELETE endpoint", status=405)
  # get all objects
  all_hangouts_dev = HangoutEntryDev.objects.all()
  # for all objects delete
  for data in all_hangouts_dev:
    data.delete()
  return HttpResponse("Deleted all dev entries")

def dev_create_dummy_dataset(request):
  try:
    #ensure correct http verb
    if request.method != "POST":
      return HttpResponse("This is a POST endpoint", status=405)
    #create dummy data
    for data in dummy_data:
      devEntry = HangoutEntryDev(
        name = data['name'],
        location = data['location'],
        google_pin = data['googlePin'],
        emoji_icon = data['emojiIcon'],
        votes = data['votes'],
        tag =  data['tag'],
        created_at = data['createdAt'],
        last_edited = data['lastEdited'],
        is_offline = data['isOffline'],
        has_been_done = data['hasBeenDone']
      )
      devEntry.save()
    return HttpResponse("dummy dev data created")
  except Exception as e:
    return HttpResponse(e, status=500)


def dev_create_hangout(request):
  try:
    #ensure correct http verb
    if request.method != "POST":
      return HttpResponse("This is a POST endpoint", status=405)
    #get json palyload
    json_payload = json.loads(request.body)
    # create new entry
    new_hangout = HangoutEntryDev(
      name = json_payload['name'],
      location = json_payload['location'],
      google_pin = json_payload['googlePin'],
      emoji_icon = json_payload['emojiIcon'],
      votes = json_payload['votes'],
      tag =  json_payload['tag'],
      created_at = time.time(),
      last_edited = time.time(),
      is_offline = json_payload['isOffline'],
      has_been_done = json_payload['hasBeenDone']
    )
    #save new entry
    new_hangout.save()
    # return all a-okay
    return HttpResponse("dev Entry added successfull")
  except Exception as e: 
    print("Error Occured:", e)
    return HttpResponse(e, status=500)

def dev_read_all(request):
  try:
    #ensure correct http verb
    if request.method != "GET":
      return HttpResponse("This is a GET endpoint", status=405)
    # get all objects
    all_hangouts = HangoutEntryDev.objects.all()
    # convert to json
    returning_json = serializers.serialize('json', all_hangouts)
    # return okay http
    return HttpResponse(returning_json, content_type="application/json")
  except Exception as e:
    print("Error Occured:", e)
    return HttpResponse(e, status=500)


def dev_read_one(request, pk):
  try:
    #ensure correct http verb
    if request.method != "GET":
      return HttpResponse("This is a GET endpoint", status=405)
    # get object
    hangout = HangoutEntryDev.objects.get(pk=pk)
    hangout_serialized = serializers.serialize('json', [hangout])
    return HttpResponse(hangout_serialized, content_type="application/json")
  except Exception as e:
    print('error:', e)
    return HttpResponse(e, status=500)


def dev_update_one(request, pk):
  try:
    #ensure correct http verb
    if request.method != "PUT":
      return HttpResponse("This is a PUT endpoint", status=405)
    # read payload
    new_parameters = json.loads(request.body)
    # get object reference
    hangout_to_edit = HangoutEntryDev.objects.get(pk=pk)
    # edit object reference
    hangout_to_edit.name = new_parameters['name']
    hangout_to_edit.location = new_parameters['location']
    hangout_to_edit.google_pin = new_parameters['googlePin']
    hangout_to_edit.emoji_icon = new_parameters['emojiIcon']
    hangout_to_edit.votes = new_parameters['votes']
    hangout_to_edit.tag =  new_parameters['tag']
    hangout_to_edit.last_edited = time.time()
    hangout_to_edit.is_offline = new_parameters['isOffline']
    hangout_to_edit.has_been_done = new_parameters['hasBeenDone']
    # save edit
    hangout_to_edit.save()
    # return all a-okay
    return HttpResponse("dev entry updated")
  except Exception as e:
    print('error:', e)
    return HttpResponse(e, status=500)

def dev_delete_one(request, pk):
  try:
    #ensure correct http verb
    if request.method != "DELETE":
      return HttpResponse("This is a DELETE endpoint", status=405)
    # get object
    hangout = HangoutEntryDev.objects.get(pk=pk)
    # delete
    hangout.delete()
    # return all a-okay
    return HttpResponse("dev entry deleted")
  except Exception as e:
    print('error:', e)
    return HttpResponse(e, status=500)