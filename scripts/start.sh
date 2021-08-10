#!/bin/bash
cd /home/ubuntu/loca-musica/server/dist
authbind --deep pm2 start main.js