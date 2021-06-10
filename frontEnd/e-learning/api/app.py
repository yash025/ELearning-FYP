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
    if(len(data) == 0):
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
    result = cursor.fetchone
    if(len(result) != 0):
        return make_response(jsonify(
            message = "Account already exits with this EmailID, try logging in"
        ), 200)
    
    print(request.args)
    print(request.data)
    print(request.path)
    response = Response()

    response.status_code = 200
    response.data = "This is from backend"
    return response


if __name__ == '__main__':
    app.run(host = "localhost", port = 5000, debug = True)