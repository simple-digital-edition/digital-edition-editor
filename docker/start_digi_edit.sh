#!/bin/bash

# Setup the database
python -m digi_edit admin setup
while [ $? -ne 0 ]
do
    sleep 10
    python -m digi_edit admin setup
done

# Run the web application
python -m digi_edit app server
