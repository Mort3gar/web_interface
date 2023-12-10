from flask import Flask
from config import DB_NAME, DB_PASSWORD
from app.mysqlConnector import DataBaseHandler
from app.api.brands import brands_api
from app.api.clients import clients_api

app = Flask(__name__)

from app import routes
dbHandler = DataBaseHandler(DB_NAME, DB_PASSWORD)
dbHandler.loadDump()

app.register_blueprint(brands_api)
app.register_blueprint(clients_api)

app.run(debug=True)