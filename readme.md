# Duoj Hangout Back-end
Using django as back end

# To Run local server
### Install django
```
pip install django
```

### Run server
```
pythong manage.py runserver
```

# Data Schemas
Hangout Schema
```
interface Hangout{
  pk:integer
  name:string,
  location:string,
  google_pin:string,
  emoji_icon:string,
  votes:integer,
  tag:string,
  created_at:timestamp,
  last_edited:timestamp
  is_offline:boolean
  has_been_done:boolean
}
```

# End Points
### GET {url}/hangouts/readAll/
Returns all hangout entries as a .jsonl

### GET {url}/hangouts/readOne/<pk:int>/
Returns the hangout entry as a .json

### POST{url}/hangouts/createHangout/
Requires a json payload of the information to create the hangout
```
payload: {
  name:string,
  location:string,
  google_pin:string,
  emoji_icon:string,
  votes:integer,
  tag:string,
  is_offline:boolean
  has_been_done:boolean
}
```
Returns an http 200 status if successful

### PUT{url}/hangouts/updateOne/<pk:int>
Requires a json payload of the information to update the hangout
```
payload: {
  name:string,
  location:string,
  google_pin:string,
  emoji_icon:string,
  votes:integer,
  tag:string,
  is_offline:boolean
  has_been_done:boolean
}
```
Returns an http 200 status if successful

### DELETE{url}/hangouts/deleteOne/<pk:int>
Returns an http 200 status if successful



# Dev Endpoints

### GET {url}/hangouts/dev_readAll/
Returns all hangout entries as a .jsonl

### GET {url}/hangouts/dev_readOne/<pk:int>/
Returns the hangout entry as a .json

### POST{url}/hangouts/dev_createHangout/
Requires a json payload of the information to create the hangout
```
payload: {
  name:string,
  location:string,
  google_pin:string,
  emoji_icon:string,
  votes:integer,
  tag:string,
  is_offline:boolean
  has_been_done:boolean
}
```
Returns an http 200 status if successful

### PUT{url}/hangouts/dev_updateOne/<pk:int>
Requires a json payload of the information to update the hangout
```
payload: {
  name:string,
  location:string,
  google_pin:string,
  emoji_icon:string,
  votes:integer,
  tag:string,
  is_offline:boolean
  has_been_done:boolean
}
```
Returns an http 200 status if successful

### DELETE{url}/hangouts/dev_deleteOne/<pk:int>
Returns an http 200 status if successful

### DELETE{url}/hangouts/dev_deleteAll/
Returns an http 200 status if successful

### POST{url}/hangouts/dev_createDummyDataset/
Returns an http 200 status if successful