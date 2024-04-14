@echo off
start chrome --kiosk "http://localhost:5173/"
start cmd /k "npm start"
cscript //nologo hide.vbs