#!/bin/sh

read -p "Commit title:" ctitle
git add -A
git commit -m $ctitle
