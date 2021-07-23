#!/bin/sh
PATH=$PATH:./node_modules/typescript/bin
echo Delete dist folder
rm -rf dist
echo Delete target folder
rm -rf target
echo Delete node modules folder
rm -rf node_modules
rm App.js lib.js  Login.js  main.js  NavBar.js  NavItem.js  Task.js
rm App.js.map lib.js.map  Login.js.map  main.js.map  NavBar.js.map  NavItem.js.map  Task.js.map
rm package-lock.json
rm -rf tutorial/__pycache__/
rm -rf tutorial/quickstart/__pycache__/
rm -rf tutorial/quickstart/migrations/__pycache__/