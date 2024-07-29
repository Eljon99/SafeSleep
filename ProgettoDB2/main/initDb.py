import pymongo
from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Configura MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["SafeSleep"]

# Collezione originale
original_collection = db['sleep_data']

# Nuove collezioni
person_collection = db['persona']
diary_collection = db['diario_persona']

# Verifica se la divisione è già stata fatta
if person_collection.count_documents({}) > 0 or diary_collection.count_documents({}) > 0:
    print("La divisione delle collezioni è già stata effettuata.")
else:
    # Processare ogni documento nella collezione originale
    for document in original_collection.find():
         # Assume che ogni documento abbia un campo _id unico

        # Documento per la collezione persona
        person_document = {
            'Person ID': document['Person ID'],
            'Gender': document['Gender'],
            'Age': document['Age'],
            'Occupation': document['Occupation'],
            'Physical Activity Level': document['Physical Activity Level'],
            'BMI Category': document['BMI Category']
        }

        # Documento per la collezione diario_persona
        diary_document = {
            'Person ID': document['Person ID'],
            'Sleep Duration': document['Sleep Duration'],
            'Quality of Sleep': document['Quality of Sleep'],
            'Stress Level': document['Stress Level'],
            'Blood Pressure': document['Blood Pressure'],
            'Heart Rate': document['Heart Rate'],
            'Daily Steps': document['Daily Steps'],
            'Sleep Disorder': document['Sleep Disorder']
        }

        # Inserire i documenti nelle nuove collezioni
        person_collection.insert_one(person_document)
        diary_collection.insert_one(diary_document)

    print("Divisione della collezione completata con successo.")

# Chiudere la connessione
#client.close()