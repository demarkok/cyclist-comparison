#/bin/bash

cd ./src/front
rm -rf build
npm install
webpack

cd ../../
stack build
stack exec cyclist-comparison < password
