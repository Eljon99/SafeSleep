import pymongo
from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Configura MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["SafeSleep"]
collection = db["sleep_data"]


# Esegui una query per ottenere tutti i documenti, escludendo il campo _id e ordinando per Person ID
#Lo facciamo per test per vedere se funzionano
#records = list(collection.find({}, {'_id': 0}).sort('Person ID', pymongo.ASCENDING))
#print(records);

"""
@app.route('/records', methods=['GET'])
def get_records():
    try:
        # Esegui una query per ottenere tutti i documenti, escludendo il campo _id e ordinando per Person ID
        records = list(collection.find({}, {'_id': 0}).sort('Person ID', pymongo.ASCENDING))

        # Restituisci i record come risposta JSON
        return jsonify(records), 200
    except Exception as e:
        # Gestisci eventuali errori e restituisci una risposta di errore
        return jsonify({'error': str(e)}), 500
"""
