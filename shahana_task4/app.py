import json
import os
from datetime import timedelta

from flask import Flask, jsonify, redirect, render_template, request, session
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "shazam-dev-secret-change-later")
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=30)

USERS_FILE = os.path.join(os.path.dirname(__file__), "users.json")


def load_users():
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, encoding="utf-8") as file:
            return json.load(file)
    return {}


def save_users(users):
    with open(USERS_FILE, "w", encoding="utf-8") as file:
        json.dump(users, file, indent=2)


@app.route("/")
def login_page():
    username = session.get("username")
    if username:
        return redirect(f"/user/{username}")
    return render_template("login.html")

@app.post("/api/login")
def login():
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip()
    password = data.get("password") or ""

    if not username or not password:
        return jsonify({"error": "Please enter your name and password."}), 400

    users = load_users()

    if username in users:
        if not check_password_hash(users[username], password):
            return jsonify({"error": "Wrong password. Try again."}), 401
    else:
        users[username] = generate_password_hash(password)
        save_users(users)

    session.permanent = True
    session["username"] = username
    return jsonify({"success": True, "redirect": f"/user/{username}"})


@app.route("/user/<username>")
def user_page(username):
    if session.get("username") != username:
        return redirect("/")
    return render_template("user_page.html", username=username)


@app.post("/logout")
def logout():
    session.clear()
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True, port=5000)
