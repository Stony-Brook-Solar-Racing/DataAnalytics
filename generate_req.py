import requests
from datetime import datetime

url = "localhost:5000/submitForm"



post_data = {
	'ISOString' : datetime.now().isoformat(),
    'velocity' : parseFloat(req.body.velocity)
}