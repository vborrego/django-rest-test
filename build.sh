#!/bin/sh
PATH=$PATH:./node_modules/typescript/bin
echo Install NPM packages
npm install
echo Compile project
tsc
echo Create application bundle
nodejs ./node_modules/webpack/bin/webpack.js --config webpack.config.js
mkdir -p static/app/dist/
cp main.html static/app/
cp dist/bundle.js static/app/dist/
cp main.css static/app/dist/
mkdir target
cp start.sh manage.py static tutorial target/ -R
