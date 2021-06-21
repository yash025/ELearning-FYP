from flask_mysqldb import MySQL
import MySQLdb.cursors
from flask import Flask, request, jsonify, make_response
from flask_cors import cross_origin
import base64
from keras.models import load_model
import cv2
import numpy as np


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

@app.route('/login', methods = ['POST'])
@cross_origin()
def login():
    params = request.get_json()
    email = params["email"]
    password = params["password"]
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
        ), 400)
    elif(password != data['Password']):
        return make_response(jsonify(
            result = "false",
            message = "Password didn't match, Please try again"
        ), 400)
    return make_response(jsonify(
            result = "true",
            message = "Successfully logged in"
        ), 200)

@app.route('/register', methods = ['POST'])
@cross_origin()
def register():
    params = request.get_json()
    email = params["email"]
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('select Password from user where Email = %s',(email, ))
    data = cursor.fetchone()
    if not data:
        cursor.execute('insert into user values(%s, %s, %s, %s, %s, %s, %s)',
        (email, params["firstName"], params["lastName"],params["age"], params["password"], 0, params["phoneNumber"]))
        mysql.connection.commit()
        cursor.close
        return make_response(jsonify(
            result = "User registered successfully"
        ), 200)
    return make_response(jsonify(
        result = "Account already exists, try logging in"
        ), 400)

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
    return make_response(jsonify(
        points = data['Points']
        ), 200)

@app.route('/updateCompleted', methods = ['POST'])
@cross_origin()
def update_Completed():
    params = request.get_json()
    email = params["email"]
    type = params["type"]
    doodleName = params["element"]
    print(params)
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
                result = "ERROR {} has occured, Contact Support!".format(e)
            ), 400) 
    else:
        try:
            level = params["level"]
            cursor.execute('insert into playCompleted values(%s, %s)', (doodleName, email, ))
            mysql.connection.commit()
            cursor.execute('select Points from user where Email = %s', (email, ))
            data = cursor.fetchone()
            points = data['Points']
            if(level == "1"):
                points = points + 5
            elif(level == "2"):
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
            ), 400)   

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
            completed = completedList
        ), 200)
    except Exception as e:
        return make_response(jsonify(
                result = "ERROR {} has occured, Contact Support!".format(e)
            ), 400)

@app.route('/profile', methods = ['GET'])
@cross_origin()
def fetchProfileDetails():
    params = request.args
    email = params.get("email")
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('select FirstName as firstName, LastName as lastName, Age as age, Password as password, PhoneNumber as phoneNumber from user where email = %s', (email, ))
        data = cursor.fetchall()
        return make_response(jsonify(
            profile = data
        ), 200)
    except Exception as e:
        return make_response(jsonify(
                result = "ERROR {} has occured, Contact Support!".format(e.__class__)
            ), 400)

@app.route('/updateProfile', methods = ['POST'])
@cross_origin()
def updateProfile():
    params = request.get_json()
    email = params['email']
    print(params)
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        if("firstName" in params):
            cursor.execute('update user set firstName = %s where email = %s', (params['firstName'], email, ))
            mysql.connection.commit()
        if("lastName" in params):
            cursor.execute('update user set lastName = %s where email = %s', (params['lastName'], email, ))
            mysql.connection.commit()
        if("age" in params):
            cursor.execute('update user set age = %s where email = %s', (params['age'], email, ))
            mysql.connection.commit()
        if("phoneNumber" in params):
            cursor.execute('update user set phoneNumber = %s where email = %s', (params['phoneNumber'], email, ))
            mysql.connection.commit()
        if("password" in params):
            cursor.execute('update user set password = %s where email = %s', (params['password'], email, ))
            mysql.connection.commit()
        cursor.close()
        return make_response(jsonify(
            result = "Successfully Updated!"
        ), 200)
    except Exception as e:
        return make_response(jsonify(
                result = "ERROR {} has occured, Contact Support!".format(e)
            ), 400)

@app.route('/fetchRanks', methods = ['GET'])
@cross_origin()
def fetchRanks():
    params = request.args
    email = params.get('email')
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('select email, firstName, lastName from user order by Points desc')
        rankList = cursor.fetchall()
        userRank = 1;
        for i in rankList:
            if(i['email'] == email):
                break
            userRank = userRank + 1

        cursor.close()
        return make_response(jsonify(
            userRank = userRank, 
            ranks = rankList
        ), 200)
    except Exception as e:
        return make_response(jsonify(
                result = "ERROR {} has occured, Contact Support!".format(e)
            ), 400)

@app.route('/canvas', methods = ['GET'])
@cross_origin()
def doodleRecognition():
    params = request.args
    type = params.get('type')
    img_data = params.get('dataUrl')
    img_width = 28
    img_height = 28
    filename = 'C:/Users/Yashwanth/Documents/doodle.png' 
    with open(filename, 'wb') as f:
        f.write(base64.b64decode(img_data))
    img = cv2.imread(filename, 0)
    img = cv2.resize(img, (img_width, img_height))
    arr = np.array(img-255)
    arr = np.array(arr/255.)
    new_test_cnn = arr.reshape(1, 28, 28, 1).astype('float32')
    if(type == "learning"):
        category = params.get('category')
        if(category == 'alphabets'):
            model = load_model('C:/Users/Yashwanth/Documents/Project/Elearning-FYP/backEnd/api/Alphabet_Recognition/alphabetRecognition.model')
            label_dict = {0:'A',1:'B',2:'C',3:'D',4:'E',5:'F',6:'G',7:'H',8:'I',9:'J',10:'K',11:'L',12:'M',
            13:'N',14:'O',15:'P',16:'Q',17:'R',18:'S',19:'T',20:'U',21:'V',22:'W',23:'X',24:'Y',25:'Z'}
            cnn_probab = model.predict(new_test_cnn, batch_size=32, verbose=0)
            pr = model.predict_classes(arr.reshape((1, 28, 28, 1)))
            expected = params.get('selected')
            actual = label_dict[pr]
            if(actual == expected):
                return make_response(jsonify(
                        result = "Correct"
                    ), 200)
            else:
                return make_response(jsonify(
                        result = "Not Correct"
                    ), 400)
        elif(category == "digits"):
            model = load_model('C:/Users/Yashwanth/Documents/Project/Elearning-FYP/backEnd/api/Digit_Recognition/digitRecognition.model')
            label_dict = {0:'One',1:'Two',2:'Three',3:'Four',4:'Five',5:'Six',6:'Seven',7:'Eight',8:'Nine'}
            cnn_probab = model.predict(new_test_cnn, batch_size=32, verbose=0)
            pr = model.predict_classes(arr.reshape((1, 28, 28, 1)))
            expected = params.get('selected')
            actual = label_dict[pr]
            if(actual == expected):
                return make_response(jsonify(
                        result = "Correct"
                    ), 200)
            else:
                return make_response(jsonify(
                        result = "Not Correct"
                    ), 400)
        else:
            model = load_model('C:/Users/Yashwanth/Documents/Project/Elearning-FYP/backEnd/api/Doodle_Recognition/quickdraw.model')
            label_dict = {0:"apple", 1:"arm", 2:"banana", 3:"bandage", 4:"baseball", 5:"bat", 6:"blackberry", 7:"bread", 8:"candle", 
            9:"carrot", 10:"circle", 11:"cloud", 12:"diamond", 13:"door", 14:"elbow", 15:"feather", 16:"foot", 17:"frying pan", 18:"hat", 
            19:"hexagon", 20:"hockey stick", 21:"key", 22:"knife", 23:"leaf", 24:"octagon", 25:"paintbrush", 26:"star", 27:"triangle", 28:"zigzag"}
            cnn_probab = model.predict(new_test_cnn, batch_size=32, verbose=0)
            pr = model.predict_classes(arr.reshape((1, 28, 28, 1)))
            expected = params.get('selected')
            actual = label_dict[pr]
            if(actual == expected):
                return make_response(jsonify(
                        result = "Correct"
                    ), 200)
            else:
                return make_response(jsonify(
                        result = "Not Correct"
                    ), 400)
    else:
        model = load_model('C:/Users/Yashwanth/Documents/Project/Elearning-FYP/backEnd/api/Doodle_Recognition/quickdraw.model')
        label_dict = {0:"apple", 1:"arm", 2:"banana", 3:"bandage", 4:"baseball", 5:"bat", 6:"blackberry", 7:"bread", 8:"candle", 
        9:"carrot", 10:"circle", 11:"cloud", 12:"diamond", 13:"door", 14:"elbow", 15:"feather", 16:"foot", 17:"frying pan", 18:"hat", 
        19:"hexagon", 20:"hockey stick", 21:"key", 22:"knife", 23:"leaf", 24:"octagon", 25:"paintbrush", 26:"star", 27:"triangle", 28:"zigzag"}
        cnn_probab = model.predict(new_test_cnn, batch_size=32, verbose=0)
        pr = model.predict_classes(arr.reshape((1, 28, 28, 1)))
        expected = params.get('selected')
        actual = label_dict[pr]
        if(actual == expected):
            return make_response(jsonify(
                    result = "Correct"
                ), 200)
        else:
            return make_response(jsonify(
                    result = "Not Correct"
                ), 400)


if __name__ == '__main__':
    app.run(host = "localhost", port = 5000, debug = True)





