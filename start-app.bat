@echo off
start "" "http://localhost:5173/"
start cmd /k "npm start"
cscript //nologo hide.vbs
