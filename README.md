This app is a REST API that exposes method to interact with a cache stored in a mongodb database. The app uses Nodejs and Express. This app does not have a frontend. You can use tools like Postman or Curl to test the API end points which are :
http://localhost:3030/api/v1 -- To get all keys, create a key/value and store in the database and to delete all keys from the database.
http://localhost:3030/api/v1/key -- To get a specific key from the database. ---- To delete a specific key from the database.

Each cache data has a TTL value of 3600, so expect your cached data to be deleted after one hour. 
