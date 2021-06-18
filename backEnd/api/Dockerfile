FROM python:3
LABEL AUTHOR = "Yashwanth"

WORKDIR /Elearning

COPY requirements.txt /Elearning/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY app.py /Elearning/app.py

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]