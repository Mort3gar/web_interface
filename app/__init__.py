from flask import Flask
from config import DB_NAME, DB_PASSWORD
from app.mysqlConnector import DataBaseHandler

app = Flask(__name__)

from app import routes
dbHandler = DataBaseHandler(DB_NAME, DB_PASSWORD)
dbHandler.loadDump()

app.run(debug=True)