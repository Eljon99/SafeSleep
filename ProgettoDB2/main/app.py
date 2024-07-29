import pymongo
from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Configura MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["SafeSleep"]
collection = db["sleep_data"]
collectionP = db["persona"]
collectionD = db["diario_persona"]

# Esegui una query per ottenere tutti i documenti, escludendo il campo _id e ordinando per Person ID
records = list(collectionD.find({}, {'_id': 0}).sort('Person ID', pymongo.ASCENDING))
print(records);


@app.route('/api/persona', methods=['GET'])
def get_persone():
    try:
        # Esegui una query per ottenere tutti i documenti, escludendo il campo _id e ordinando per Person ID
        records = list(collectionP.find({}, {'_id': 0}).sort('_id', pymongo.ASCENDING))

        # Restituisci i record come risposta JSON
        return jsonify(records), 200
    except Exception as e:
        # Gestisci eventuali errori e restituisci una risposta di errore
        return jsonify({'error': str(e)}), 500

@app.route('/api/diario', methods=['GET'])
def get_diario():
    try:
        # Esegui una query per ottenere tutti i documenti, escludendo il campo _id e ordinando per Person ID
        records = list(collectionD.find({}, {'_id': 0}).sort('Person ID', pymongo.ASCENDING))

        # Restituisci i record come risposta JSON
        return jsonify(records), 200
    except Exception as e:
        # Gestisci eventuali errori e restituisci una risposta di errore
        return jsonify({'error': str(e)}), 500

@app.route('/api/persona', methods=['POST'])
def add_persona():
    try:
        # Ottieni i dati della persona dal corpo della richiesta
        dataPersona = request.json

        required_fields = ['Gender', 'Age', 'Occupation', 'Physical Activity Level', 'BMI Category']
        for field in required_fields:
            if field not in dataPersona or not dataPersona[field]:
                return jsonify({'error': f'Dato mancante: {field}'}), 400

        # Inserisci i dati della persona nella collezione
        result = collectionP.insert_one(dataPersona)
        new_person = collectionP.find_one({'_id': result.inserted_id}, {'_id': 0})

        # Restituisci il nuovo record come risposta
        return jsonify(new_person), 201
    except Exception as e:
        # Gestisci eventuali errori e restituisci una risposta di errore
        return jsonify({'error': str(e)}), 500


@app.route('/api/persona/<int:person_id>', methods=['DELETE'])
def delete_persona(person_id):
    try:
        # Cerca e elimina la persona con il Person ID specificato
        result = collectionP.delete_one({"Person ID": person_id})

        if result.deleted_count == 1:
            # Se la persona è stata eliminata con successo
            return jsonify({'message': 'Persona eliminata con successo'}), 200
        else:
            # Se non è stata trovata nessuna persona con il Person ID specificato
            return jsonify({'message': 'Persona non trovata'}), 404
    except Exception as e:
        # Gestisci eventuali errori e restituisci una risposta di errore
        return jsonify({'error': str(e)}), 500
