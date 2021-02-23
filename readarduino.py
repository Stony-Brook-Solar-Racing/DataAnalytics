import serial
#ser = serial.Serial('/dev/ttyACM0',9600)

from datetime import datetime
import requests
import random 

url = "http://localhost:5000/submitForm"

def parse_data(line):
    print("> parsing line :"+line)
    try:
        a= {"velocity": int(line), "ISOString": datetime.now().isoformat()}
        print (a)
        return a
    except:
        print ("fail to parse")
        return None

if __name__ == "__main__":
    '''
    
    Arduino reading code for Pi
    
    while 1:
        if (ser.in_waiting > 0):
            line = ser.readline()
            data = parse_data(line)
            if data:
                print ("data:", data)
                try:
                    r = requests.post(url=url, data = data, timeout=1)
                    print (data)
                except requests.exceptions.ReadTimeout:
                    pass
                print ("end send")
            else:
                print ("invalid line")
    '''
    while 1:
        tempdata = {"velocity": random.randint(0,100),"battery": random.random()*10,"waterlevel": random.random()*5+1, "ISOString": datetime.now().isoformat()}
        try:
            r = requests.post(url=url,data=tempdata,timeout=1)
        except requests.exceptions.ReadTimeout:
            pass
        
