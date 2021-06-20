from flask.globals import current_app
from flask_mysqldb import MySQL
import MySQLdb.cursors
from flask import Flask, json, request, jsonify, make_response
from flask_cors import cross_origin

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '2571999'
app.config['MYSQL_DB'] = 'elearning'
  
mysql = MySQL(app)


@app.route('/hello_world', methods = ['GET', 'POST'])
@cross_origin()
def hello_world():
    return make_response(jsonify(
            result = "Hello World from Yashwanth"
        ), 200)

@app.route('/login', methods = ['GET', 'POST'])
@cross_origin()
def login():
    params = request.args
    email = params.get("email")
    password = params.get("password")
    print(email)
    print(password)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('select Password from user where Email = %s',(email, ))
    data = cursor.fetchone()
    cursor.close
    if not data:
        return make_response(jsonify(
            result = "false",
            message = "Didn't find any account associated with this EmailID, Please create a new account"
        ), 200)
    elif(password != data['Password']):
        return make_response(jsonify(
            result = "false",
            message = "Password didn't match, Please try again"
        ), 200)
    return make_response(jsonify(
            result = "true",
            message = "Successfully logged in"
        ), 200)

@app.route('/register', methods = ['POST', 'GET'])
@cross_origin()
def register():
    params = request.args
    email = params.get("email")
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('select Password from user where Email = %s',(email, ))
    data = cursor.fetchone()
    if not data:
        cursor.execute('insert into user values(%s, %s, %s, %s, %s, %s, %s)',
        (email, params.get("firstName"), params.get("lastName"),params.get("age"), params.get("password"), 0, params.get("phoneNumber")))
        mysql.connection.commit()
        cursor.close
        return make_response(jsonify(
            result = "User registered successfully"
        ), 200)
    return make_response(jsonify(
        result = "Account already exists, try logging in"
        ), 200)

@app.route('/points', methods = ['GET'])
@cross_origin()
def FetchPointsForUser():
    params = request.args
    email = params.get("email")
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    try:
        cursor.execute('select Points from user where Email = %s',(email, ))
        data = cursor.fetchone()
        cursor.close
    except Exception as e:
        return make_response(jsonify(
            result = "ERROR {} has occured, Contact Support!".format(e.__class__)
        ), 200) 
    if not data:
        return make_response(jsonify(
            result = "Error fetching points for the user associated with emailId {}".format(email)
            ), 200)
    return make_response(jsonify(result = data['Points']), 200)

@app.route('/updateCompleted', methods = ['GET', 'POST'])
@cross_origin()
def update_Completed():
    params = request.args
    email = params.get("email")
    type = params.get("type")
    doodleName = params.get("element")
    print(email, type, doodleName)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if(type == "learning"):
        try:
            cursor.execute('insert into learnCompleted values(%s, %s)',(doodleName, email, ))
            mysql.connection.commit()
            cursor.close
            return make_response(jsonify(
                result = "Updated Successfully"
            ), 200)
        except Exception as e:
            return make_response(jsonify(
                result = "ERROR {} has occured, Contact Support!".format(e.__class__)
            ), 200) 
    else:
        try:
            level = params.get("level")
            cursor.execute('insert into playCompleted values(%s, %s)', (doodleName, email, ))
            mysql.connection.commit()
            cursor.execute('select Points from user where Email = %s', (email, ))
            data = cursor.fetchone()
            points = data['Points']
            if(level == "easy"):
                points = points + 5
            elif(level == "medium"):
                points = points + 10
            else:
                points = points + 15
            cursor.execute('update user set points = %s where email = %s', (points, email, ))
            mysql.connection.commit()
            cursor.close
            return make_response(jsonify(
                result = "Updated Succesfully."
            ), 200) 
        except Exception as e:
            return make_response(jsonify(
                result = "ERROR {} has occured, Contact Support!".format(e.__class__)
            ), 200)   

@app.route('/completedList', methods = ['GET']) 
@cross_origin()
def fetchCompletedDoodles():
    params = request.args
    email = params.get("email")
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    try:
        cursor.execute('select C.learnDoodleName as doodleName from learncompleted C, user U where U.email = C.email and U.email = %s', (email, ))
        data = cursor.fetchall()
        completedList = [value['doodleName'] for value in data]
        cursor.close
        return make_response(jsonify(
            result = completedList
        ), 200)
    except Exception as e:
        return make_response(jsonify(
                result = "ERROR {} has occured, Contact Support!".format(e.__class__)
            ), 200)

@app.route('/profile', methods = ['GET'])
@cross_origin()
def fetchProfileDetails():
    params = request.args
    email = params.get("email")
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('select FirstName, LastName, Age, Password, Points, PhoneNumber from user where email = %s', (email, ))
        data = cursor.fetchall()
        return make_response(jsonify(
            result = data
        ), 200)
    except Exception as e:
        return make_response(jsonify(
                result = "ERROR {} has occured, Contact Support!".format(e.__class__)
            ), 200)

@app.route('/updateProfile', methods = ['GET', 'POST'])
@cross_origin()
def updateProfile():
    params = request.args
    email = params.get("email")
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if("firstName" in params):
        cursor.execute('update user set firstName = %s where email = %s', (params.get('firstName'), email, ))
        mysql.connection.commit()
    if("lastName" in params):
        cursor.execute('update user set lastName = %s where email = %s', (params.get('lastName'), email, ))
        mysql.connection.commit()
    if("age" in params):
        cursor.execute('update user set age = %s where email = %s', (params.get('age'), email, ))
        mysql.connection.commit()
    if("phoneNumber" in params):
        cursor.execute('update user set phoneNumber = %s where email = %s', (params.get('phoneNumber'), email, ))
        mysql.connection.commit()
    if("password" in params):
        cursor.execute('update user set password = %s where email = %s', (params.get('password'), email, ))
        mysql.connection.commit()
    return make_response(jsonify(
        result = "Successfully Updated!"
    ), 200)

if __name__ == '__main__':
    app.run(host = "localhost", port = 5000, debug = True)





