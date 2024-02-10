from .views import *
from django.urls import path


urlpatterns = [
    path('readAll/', read_all),
    path('readOne/<int:pk>/', read_one),
    path('createHangout/', create_hangout),
    path('updateOne/<int:pk>/', update_one),
    path('deleteOne/<int:pk>/', delete_one),
    # for development database only to help debug
    path('dev_readAll/', dev_read_all),
    path('dev_readOne/<int:pk>/', dev_read_one),
    path('dev_createHangout/', dev_create_hangout),
    path('dev_updateOne/<int:pk>/', dev_update_one),
    path('dev_deleteOne/<int:pk>/', dev_delete_one),
    # for development
    path('dev_deleteAll/', dev_delete_all),
    path('dev_createDummyDataset/', dev_create_dummy_dataset),
]