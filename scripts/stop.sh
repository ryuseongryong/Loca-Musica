#!/bin/bash
cd /home/ubuntu/loca-musica/server/dist
pm2 stop main.js 2> /dev/null || true
pm2 delete main.js 2> /dev/null || true