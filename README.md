# SafeSleep

##### IL PROGETTO È AMATORIALE, I LOGHI E IL NOME DELL'PROGETTO SONO INVENTATI E UTILIZZATI SOLO IN AMBITO UNIVERSITARIO.
<br/>
<p align="center" style="border-radius:10px;"><img src="ProgettoDB2/main/safe-sleep/src/assets/SleepLogo2.png" width = "200vw"></p>
<br/>
Hanno contribuito a questo progetto:
<br/><br/>

* [Consiglio Luigi](https://github.com/luicons01)
* [Hida Eljon](https://github.com/Eljon99)


## Introduzione
Il progetto è una web-application che permette di gestire un database contenente dati sul sonno e sulla salute di un gruppo di persone. Oltre alle consuete operazioni CRUD, sono condotte analisi specifiche per estrarre informazioni significative. Che tu sia un appassionato del benessere o semplicemente curioso, safeSleep è il tuo compagno ideale per scoprire i segreti di un sonno sano e rigenerante!

## Caratteristiche
- **Operazioni CRUD:** Utilizza le operazioni principali per creare, modificare, eliminare o semplicemente visualizzare le informazioni sui dati del sonno delle persone.
- **Analisi Statistica:** Effettua analisi statistiche approfondite (es., correlazione tra età e qualità del sonno).
- **Dizionario dei Dati:** Glossario facilmente accessibile che spiega la terminologia e le strutture del dataset.

## Tecnologie
Questo progetto utilizza un insieme di tecnologie robuste tra cui:

<p align = "center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python Logo" width="50" height="50"/> 
    <img src="https://repository-images.githubusercontent.com/596892/cc2c69ec-9251-4b33-8283-b86a8659c9cb" alt="Flask Logo" width="50" height="50"/>
   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/PyCharm_Icon.svg/2048px-PyCharm_Icon.svg.png" alt="PyCharm Logo" width="50" height="50"/>
    <img src="https://miro.medium.com/v2/resize:fit:512/1*doAg1_fMQKWFoub-6gwUiQ.png" alt="MongoDB Logo" width="50" height="50"/>
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" width="50" height="50"/>
</p>


- **Python (3.12) & Flask (3.0.3):** Servizi backend per l'elaborazione dei dati.
- **PyCharm (2024.1.4):** Come ambiente di sviluppo.
- **React (18.3.1):** Per costruire l'interfaccia utente.
- **MongoDB: (2.0.1)** Database NoSQL per una gestione efficiente dei dati.

## Configurazione
Per configurare il progetto:

1. Clona il repository:
   ```bash
   git clone [https://github.com/Eljon99/SafeSleep.git]
2. Caricare il dataset su MongoDB Compass per permettere l'accesso al database (assicurarsi che il nome che viene associato alla collection sia uguale a quello associato in initDb.py).
3. Se stai usando un IDE diverso da PyCharm installa e attiva il virtual environment di Python:
   ```bash
   python -m venv venv
4. Installa le dipendenze per il backend:
   ```bash
   pip install -r requirements.txt 
5. Installa le dipendenze per il frontend e builda il progetto se stai usando un IDE diverso da PyCharm:
   ```bash
   cd ProgettoDB2/main/safe-sleep
   npm install
   npm run build
6. Se stai usando PyCharm crea due configurazioni nuove, una per React (command: start) e una per Flask (Enviroment Variables: FLASK_APP=app.py).
7. Effettuare il run del progetto avviando le due configurazioni.

## Licenza
Questo progetto è distribuito con licenza MIT, quindi potete clonarlo, modificarlo e condividerlo liberamente. Vi chiediamo solo di ricordare di attribuirci il merito!
