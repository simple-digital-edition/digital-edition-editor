#!/bin/bash

# Setup the database
digi_edit -c /etc/digi-edit/production.ini init-db
while [ $? -ne 0 ]
do
    sleep 10
    digi_edit -c /etc/digi-edit/production.ini init-db
done

# Run the web application
pserve /etc/digi-edit/production.ini
