from .views import *
from django.urls import path


urlpatterns = [
    path('readAll/', read_all),
    path('readOne/', read_one),
    path('createHangout/', create_hangout),
    path('updateOne/', update_one),
    path('deleteOne/', delete_one),
    # for development database only wi
    path('deleteAll/', delete_all),
    path('createDummyDataset/', create_dummy_dataset),
]