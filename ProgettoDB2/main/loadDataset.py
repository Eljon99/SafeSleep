import csv
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["SafeSleep"]
collection = db["sleep_data"]

with open('../dataset/Sleep_health_and_lifestyle_dataset.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        collection.insert_one(row)

print("Data loaded successfully!")
