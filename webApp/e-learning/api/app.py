from types import resolve_bases
from flask_mysqldb import MySQL
import MySQLdb.cursors
from flask import Flask, request, Response, jsonify, make_response


app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '2571999'
app.config['MYSQL_DB'] = 'elearning'
  
mysql = MySQL(app)


@app.route('/hello_world', methods = ['GET', 'POST'])
def hello_world():
    return make_response(jsonify(
            message = "Hello World from Yashwanth"
        ), 200)

@app.route('/login', methods = ['GET', 'POST'])
def login():
    params = request.args
    email = params.get("email")
    password = params.get("password")
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('select Password from user where Email = %s',(email, ))
    data = cursor.fetchone()
    cursor.close
    if not data:
        return make_response(jsonify(
            message = "Didn't find any account associated with this EmailID, Please create a new account"
        ), 200)
    elif(password != data['Password']):
        return make_response(jsonify(
            message = "Password didn't match, Please try again"
        ), 200)
    return make_response(jsonify(
            message = "Successfully logged in"
        ), 200)

@app.route('/register', methods = ['POST', 'GET'])
def register():
    params = request.args
    email = params.get("email")
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('select Password from user where Email = %s',(email, ))
    data = cursor.fetchone()
    password = str("2571999")
    if not data:
        cursor.execute('insert into user values(%s, %s, %s, %s, %s, %s, %s)',
        (email, params.get("firstname"), params.get("lastname"),params.get("age"), params.get("password"), 0, params.get("phonenumber")))
        mysql.connection.commit()
        cursor.close
        return make_response(jsonify(
            message = "User with emailID %s is registered successfully"
        ), 200)
    elif(password != data['Password']):
        return make_response(jsonify(
            message = "Account already exists, try logging in"
        ), 200)


if __name__ == '__main__':
    app.run(host = "localhost", port = 5000, debug = True)