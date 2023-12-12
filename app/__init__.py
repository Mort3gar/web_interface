from flask import Flask
from config import DB_NAME, DB_PASSWORD
from app.mysqlConnector import DataBaseHandler
from app.api.brands import brands_api
from app.api.clients import clients_api
from app.api.orders import orders_api
from app.api.posts import posts_api
from app.api.product import product_api
from app.api.staff import staff_api
from app.api.types_of_repairs import types_of_repairs_api

app = Flask(__name__)

from app import routes
dbHandler = DataBaseHandler(DB_NAME, DB_PASSWORD)
dbHandler.loadDump()

app.register_blueprint(brands_api)
app.register_blueprint(clients_api)

app.run(debug=True)