# this is for my own testing
import requests
import time
import json
from clearShell import clear_console

clear_console()

# define url
url = "http://localhost:8000/hangouts/"

# read all endpoint 
print("------------- Reading all entries")
response = requests.get(url + "dev_readAll/")
print(response.text)

# create one entry
# print("------------- Creating one hangout entry")
# # create payload
# data = {
#   'name':'Mookata',
#   'location': 'ang mo kio s11',
#   'googlePin': 'https://google.com',
#   'emojiIcon': 'B',
#   'votes': '5',
#   'tag': 'FD',
#   'createdAt': time.time(),
#   'lastEdited': time.time(),
#   'isOffline':True,
#   'hasBeenDone': True,
# }
# header = {"Content-Type": "application/json"}
# json_payload = json.dumps(data)
# # make request
# response = requests.post(url + "dev_createHangout/", data=json_payload, headers=header)
# print(response.text)

# read one specific entry
# print("------------- reading one specific entry")
# # make request
# response = requests.get(url + "dev_readOne/12/")
# print(response.text)

# # update one entry
# print("------------- updating one hangout entry")
# # create payload
# data = {
#   'name':'this is edited',
#   'location': 'ang mo kio block 230',
#   'googlePin': 'https://google.com',
#   'emojiIcon': 'H',
#   'votes': '5',
#   'tag': 'FD',
#   'isOffline':True,
#   'hasBeenDone': True,
# }
# header = {"Content-Type": "application/json"}
# json_payload = json.dumps(data)
# # make request
# response = requests.put(url + "dev_updateOne/12/", data=json_payload, headers=header)
# print(response.text)

# # delete one specific entry
# print("------------- deleting one specific entry")
# # make request
# response = requests.delete(url + "dev_deleteOne/12/")
# print(response.text)

# * ----------------------------- dev stuff

# # read all endpoint dev
# print("------------- Reading all entries (for dev)")
# response = requests.post(url + "dev_readAll/")
# print(response.text)

# delete all endpoint dev
# print("------------- delete all data (for dev)")
# response = requests.post(url + "dev_deleteAll/")
# print(response.text)

# # create dummy data
# print("------------- create dummy dataset (for dev)")
# response = requests.post(url + "dev_createDummyDataset/")
# print(response.text)