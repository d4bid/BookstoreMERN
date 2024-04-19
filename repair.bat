@echo off
cd frontend
start cmd /k "npm install && exit"
cd ../backend
start cmd /k "npm install && exit"
