#!/bin/bash

sudo apt update
sudo apt install openjdk-17-jdk -y
echo 'export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java))))' >> ~/.bashrc
source ~/.bashrc
