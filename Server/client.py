from __future__ import print_function
from flask import Flask , jsonify
import os
import psutil
import json
import datetime
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
pid = os.getpid()
py = psutil.Process(pid)

@app.route('/api/analytics/memory', methods=['GET'])
def get_tasks():
    
    hostname = "server 01"
    timeStamp = datetime.datetime.now().timestamp()

    virtual_memory = psutil.virtual_memory()
    cpu_percent = psutil.cpu_percent()
    data = jsonify(
        serverId = hostname,
        cpuPercentage = cpu_percent,
        available = virtual_memory[1], 
        free = virtual_memory[4], 
        percent = virtual_memory[2], 
        total = virtual_memory[0], 
        used = virtual_memory[3],
        unit = 'bytes',
        timestamp = timeStamp
        )
    
    return data

if __name__ == '__main__':
    app.run(debug=True)
