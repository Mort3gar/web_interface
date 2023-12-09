import flask

from app import app
from flask import render_template, request, redirect, url_for, make_response


@app.route("/", methods=["GET"])
@app.route("/table_staff", methods=["GET"])
def main_page():
    return render_template("table_staff.html")

@app.route("/add_staff", methods=["GET"])
def add_staff():
    return render_template("add_staff_form.html")
