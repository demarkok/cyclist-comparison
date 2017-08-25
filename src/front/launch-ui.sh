#/bin/bash

npm install --global webpack webpack-dev-server
rm -rf build
webpack
webpack-dev-server