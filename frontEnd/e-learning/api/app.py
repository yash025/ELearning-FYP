from types import resolve_bases
from flask import Flask, request, Response
from flaskext.mysql import MySQL

app = Flask(__name__)

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'EmpData'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

# @app.route('/', defaults={'path':''})
@app.route('/login', methods = ['GET', 'POST'])
def login():
    print(request.args)
    params = request.args
    conn = mysql.connect()
    cursor =conn.cursor()
    cursor.execute('''select * from user where Email = %s''',(params.get("email")))
    data = cursor.fetchall()
    response = Response()
    response.status_code = 200
    response.data = "This is from backend"
    return response

@app.route('/register', methods = ['POST', 'GET'])
def register():
    print(request.args)
    print(request.data)
    print(request.path)
    response = Response()

    response.status_code = 200
    response.data = "This is from backend"
    return response


if __name__ == '__main__':
    app.run(host = "localhost", port = 5000, debug = True)