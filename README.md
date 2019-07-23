# Memo---The-Memory-Meter

I did this project during my Internship period at Pearson Inc. THis is a simple Memory meter to measure memory utilization on multiple servers. 

### Client

Client is developed using MDB React. It will call the server API continuously to get data. The client is running on node, so follow these steps to turn up the client. I recommend WebStorm as an IDE to build and run the client.

Clone the project using git

```bash
git clone
```
Install dependencies
```npm
npm install
```
Run the script
```npm
npm start
```


![alt text](https://github.com/asirihewage/Memo---The-Memory-Meter/blob/master/screenshots/ScreenShot_20190723221656.png)

### Server

Server is running an API on python Flask environment.

Install modules required using pip
```python
pip install -r Server/requirements.txt
```

Run python script
```python
python Server/server.py 
```

![alt text](https://github.com/asirihewage/Memo---The-Memory-Meter/blob/master/screenshots/ScreenShot_20190723221733.png)

