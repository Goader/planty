#!/bin/bash

SCRIPT_DIR=$(dirname $(realpath -s $0))

openssl rand -base64 700 > $SCRIPT_DIR/mongodb/keyfile
chmod 400 $SCRIPT_DIR/mongodb/keyfile
sudo chown 999:999 $SCRIPT_DIR/mongodb/keyfile
