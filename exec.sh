#/bin/bash

cd ./src/front
rm -rf build
rm -rf node_modules
npm install
npm install webpack
npm install --global webpack
webpack

cd ../../
stack build
stack exec cyclist-comparison < password
