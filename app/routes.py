import flask

from app import app
from app.mysqlConnector import dbHandler
from flask import render_template, request, redirect, url_for, make_response


# Функция вывода страницы с ошибкой 404, если она не найдена
@app.errorhandler(404)
def page_not_found(e):
    return "<h1>Страница не найдена</h1><p>Попробуйте другой запрос</p>", 404


# Функция вывода страны с ошибкой 500 по вине сервера
@app.errorhandler(500)
def page_not_found(e):
    return "<h1>Ошибка на стороне сервера</h1><p>Сообщите в тех. поддержку</p>", 500


@app.route("/", methods=["GET"])
@app.route("/table_staff", methods=["GET"])
def main_page():
    print(dbHandler.test())
    return render_template("table_staff.html")


@app.route("/add_staff", methods=["GET"])
def add_staff():
    return render_template("add_staff_form.html")
