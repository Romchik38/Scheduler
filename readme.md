A Server can start tasks.  
Examle for start:   
  http://localhost:8001/api/read2txt?name=hello&interval=1000  

api - required folder to run a task  
read2txt - name of the function  
name - name of the task (parameter)  
interval - number in ms for setInterval (parameter)  
timeout - string like 2020-05-04T18:30:27.574Z for one-time start  

Task will be not started.  
  Interval and timeout at the same time      
  Interval is not a number  ('abc')  
  Timeout is an Invalid Date  ('2020-1-abc')  
