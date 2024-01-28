from django.shortcuts import HttpResponse

# turn this to false for production
is_dev = True

def read_all(request):
  return HttpResponse("this end point is not done")

def read_one(request):
  return HttpResponse("this end point is not done")

def create_hangout(request):
  return HttpResponse("this end point is not done")

def update_one(request):
  return HttpResponse("this end point is not done")

def delete_one(request):
  return HttpResponse("this end point is not done")




## ---------- only for development

def delete_all(request):
  return HttpResponse("this end point is not done")

def create_dummy_dataset(request):
  return HttpResponse("this end point is not done")
