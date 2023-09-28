# Tien Len Game Server
> npm install express socket.io



## Dev

Nodemon error
Fixed:
> kill -9 $(lsof -t -i:3000)
>netstat -ano | findstr :3000
> taskkill /F /PID 12345

Kill all process on Windows
> taskkill /F /IM nginx.exe

Delete process in Windows
~~~~
@ECHO OFF
wmic process where name='nginx.exe' delete
~~~~