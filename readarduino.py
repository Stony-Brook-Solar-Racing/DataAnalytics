import serial
from datetime import datetime
import requests
import random 

url = "http://localhost:5000/submitForm"
ser, ser2 = null

def connect_to_serial():
    try:
        ser = serial.Serial('/dev/ttyACM0',9600)
        ser2 = serial.Serial('/dev/ttyACM0',9700)
        print ("connected serially")
    except:
        pass

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
