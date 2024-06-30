from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Configura MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["SafeSleep"]
collection = db["sleep_data"]

@app.route('/')
def home():
    return "Welcome to the Sleep Data API!"

if __name__ == '__main__':
    app.run(debug=True)
