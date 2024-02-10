from .views import *
from django.urls import path


urlpatterns = [
    path('readAll/', read_all),
    path('readOne/', read_one),
    path('createHangout/', create_hangout),
    path('updateOne/', update_one),
    path('deleteOne/', delete_one),
    # for development database only to help debug
    path('dev_readAll/', dev_read_all),
    path('dev_readOne/', dev_read_one),
    path('dev_createHangout/', dev_create_hangout),
    path('dev_updateOne/', dev_update_one),
    path('dev_deleteOne/', dev_delete_one),
    # for development
    path('dev_deleteAll/', dev_delete_all),
    path('dev_createDummyDataset/', dev_create_dummy_dataset),
]