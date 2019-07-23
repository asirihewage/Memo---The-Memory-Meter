import schedule
import time

def job():
    import requests 
      
    server01 = "http://localhost:5000/api/analytics/memory"

    r = requests.get(url = server01) 
      
    data = r.json() 
    
    print(data)
    
schedule.every(1).minutes.do(job)
#schedule.every().hour.do(job)
#schedule.every().day.at("10:30").do(job)
print("Monitoring Started")
while 1:
    
    schedule.run_pending()
    time.sleep(1)

