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
#records = list(collectionD.find({}, {'_id': 0}).sort('Person ID', pymongo.ASCENDING))
#print(records);

#LETTURA DELLE PERSONE
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

#Trova una persona dato il suo id
@app.route('/api/persona/<int:person_id>', methods=['GET'])
def get_persona_by_id(person_id):
    try:
        app.logger.info(f"Richiesta GET per Person ID: {person_id}")  # Log per debug
        # Cerca la persona con il Person ID specificato
        person = collectionP.find_one({'Person ID': person_id}, {'_id': 0})

        # Restituisci i dettagli della persona come risposta JSON
        return jsonify(person), 200

    except Exception as e:
        app.logger.error(f"Errore durante la richiesta GET: {str(e)}")  # Log per debugging
        return jsonify({'error': str(e)}), 500


#LETTURA DEI DIARI
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


# Collezione per il contatore, che tiene traccia dell'ultimo valore usato pre Person ID
counters_collection = db['counters']
# Funzione per ottenere il prossimo ID
def get_next_sequence_value(sequence_name):
    sequence_document = counters_collection.find_one_and_update(
        {"_id": sequence_name},
        {"$inc": {"sequence_value": 1}},
        return_document=pymongo.ReturnDocument.AFTER,
        upsert=True
    )
    return sequence_document["sequence_value"]

#CREAZIONE DI UNA PERSONA
@app.route('/api/persona', methods=['POST'])
def add_persona():
    try:
        # Ottieni i dati della persona dal corpo della richiesta
        dataPersona = request.json

        required_fields = ['Gender', 'Age', 'Occupation', 'Physical Activity Level', 'BMI Category']
        for field in required_fields:
            if field not in dataPersona or not dataPersona[field]:
                return jsonify({'error': f'Dato mancante: {field}'}), 400

        # Ottieni il prossimo Person ID autoincrementale
        next_person_id = get_next_sequence_value("person_id")

        # Aggiungi Person ID ai dati della persona
        dataPersona['Person ID'] = next_person_id

        # Inserisci i dati della persona nella collezione
        result = collectionP.insert_one(dataPersona)
        new_person = collectionP.find_one({'_id': result.inserted_id}, {'_id': 0})

        # Restituisci il nuovo record come risposta
        return jsonify(new_person), 201
    except Exception as e:
        # Gestisci eventuali errori e restituisci una risposta di errore
        return jsonify({'error': str(e)}), 500


#CREAZIONE DI UN DIARIO
@app.route('/api/diario', methods=['POST'])
def add_diario():
    try:
        # Ottieni i dati del diario dal corpo della richiesta
        dataDiario = request.json
        print("Dati ricevuti:", dataDiario)  # Log dei dati ricevuti

        required_fields = ['Person ID', 'Sleep Duration', 'Quality of Sleep', 'Stress Level', 'Blood Pressure', 'Heart Rate', 'Daily Steps', 'Sleep Disorder']
        for field in required_fields:
            if field not in dataDiario or not dataDiario[field]:
                return jsonify({'error': f'Dato mancante: {field}'}), 400

        # Verifica se il Person ID esiste nella collezione persona
        try:
            person_id = int(dataDiario['Person ID'])  # Converte la stringa in un intero
        except ValueError:
            return jsonify({'error': 'Person ID non valido'}), 400

        person_exists = collectionP.find_one({'Person ID': person_id})
        if not person_exists:
            return jsonify({'error': 'Person ID non valido'}), 400

        # Inserisci i dati del diario nella collezione
        result = collectionD.insert_one(dataDiario)
        new_diario = collectionD.find_one({'_id': result.inserted_id}, {'_id': 0})

        # Restituisci il nuovo record come risposta
        return jsonify(new_diario), 201
    except Exception as e:
        # Gestisci eventuali errori e restituisci una risposta di errore
        return jsonify({'error': str(e)}), 500


#MODIFICA DI UN DIARIO
@app.route('/api/diario/<int:person_id>', methods=['PUT'])
def update_diario(person_id):
    try:
        # Ottieni i dati del diario dal corpo della richiesta
        updated_data = request.json
        print("Dati ricevuti per l'aggiornamento:", updated_data)  # Log dei dati ricevuti

        # Verifica se il Person ID esiste nella collezione diario
        existing_diario = collectionD.find_one({'Person ID': person_id})
        if not existing_diario:
            return jsonify({'error': 'Person ID non trovato'}), 404

        # Aggiorna i dati del diario nella collezione
        result = collectionD.update_one(
            {'Person ID': person_id},
            {'$set': updated_data}
        )

        # Restituisci il record aggiornato come risposta
        updated_diario = collectionD.find_one({'Person ID': person_id}, {'_id': 0})
        return jsonify(updated_diario), 200

    except Exception as e:
        # Gestisci eventuali errori e restituisci una risposta di errore
        return jsonify({'error': str(e)}), 500


#ELIMINAZIONE DI UNA PERSONA
@app.route('/api/persona/<int:person_id>', methods=['DELETE'])
def delete_persona(person_id):
    try:
        # Cerca e elimina la persona con il Person ID specificato
        result_persona = collectionP.delete_one({"Person ID": person_id})

        if result_persona.deleted_count == 1:
            # Se la persona è stata eliminata con successo, elimina anche il diario/registro associato
            result_diario = collectionD.delete_many({"Person ID": person_id})

            return jsonify({
                'message': 'Persona e diario/registro associato eliminati con successo',
                'deleted_diaries_count': result_diario.deleted_count
            }), 200
        else:
            # Se non è stata trovata nessuna persona con il Person ID specificato
            return jsonify({'message': 'Persona non trovata'}), 404
    except Exception as e:
        # Gestisci eventuali errori e restituisci una risposta di errore
        return jsonify({'error': str(e)}), 500


@app.route('/api/activity-sleep-correlation', methods=['GET'])
def get_activity_sleep_correlation():
    try:
        pipeline = [
            {
                "$lookup": {
                    "from": "diario_persona",
                    "localField": "Person ID",
                    "foreignField": "Person ID",
                    "as": "diary_info"
                }
            },
            {
                "$unwind": "$diary_info"
            },
            {
                "$lookup": {
                    "from": "persona",
                    "localField": "Person ID",
                    "foreignField": "Person ID",
                    "as": "person_info"
                }
            },
            {
                "$unwind": "$person_info"
            },
            {
                "$project": {
                    "_id": 0,
                    "Person ID": 1,
                    "Age": "$person_info.Age",  # Aggiungi 'Age' dalla collezione 'persona'
                    "Quality of Sleep": "$diary_info.Quality of Sleep"
                }
            }
        ]
        results = list(collectionP.aggregate(pipeline))
        return jsonify(results), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/activity-level-distribution', methods=['GET'])
def get_activity_level_distribution():
    try:
        pipeline = [
            {
                "$bucket": {
                    "groupBy": "$Physical Activity Level",
                    "boundaries": [30, 46, 61, 76, 91],  # Definisci i limiti dei range
                    "default": "Other",  # Valori fuori dai range specificati
                    "output": {
                        "count": {"$sum": 1}
                    }
                }
            }
        ]
        results = list(collectionP.aggregate(pipeline))

        # Formatta i risultati per renderli compatibili con il frontend
        formatted_results = [
            {"name": f"{result['_id']} - {result['_id'] + 15}", "value": result["count"]}
            for result in results if result["_id"] != "Other"
        ]

        return jsonify(formatted_results), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/bmi-stress-correlation', methods=['GET'])
def get_bmi_stress_correlation():
    try:
        pipeline = [
            {
                "$lookup": {
                    "from": "diario_persona",
                    "localField": "Person ID",
                    "foreignField": "Person ID",
                    "as": "diary_info"
                }
            },
            {
                "$unwind": "$diary_info"
            },
            {
                "$lookup": {
                    "from": "persona",
                    "localField": "Person ID",
                    "foreignField": "Person ID",
                    "as": "person_info"
                }
            },
            {
                "$unwind": "$person_info"
            },
            {
                "$group": {
                    "_id": "$person_info.BMI Category",
                    "Average Stress Level": {"$avg": "$diary_info.Stress Level"}
                }
            },
            {
                # Arrotonda il valore di Average Stress Level a due decimali
                "$project": {
                    "_id": 0,
                    "BMI Category": "$_id",
                    "Average Stress Level": {
                        "$round": ["$Average Stress Level", 2]
                    }
                }
            }
        ]
        results = list(collectionP.aggregate(pipeline))
        return jsonify(results), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


