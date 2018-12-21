import pymongo, sys
from pymongo import MongoClient

email=sys.argv[1]
client=MongoClient()
db=client.tests
db.users.update({"email":email},{"$set":{"admin":True}})
