#!/bin/bash

sed -i "s+{{username}}+$GMAIL_USERNAME+g" msmtprc
sed -i "s+{{password}}+$GMAIL_PASSWORD+g" msmtprc

mv -f msmtprc /etc/

uvicorn app:app --host 0.0.0.0 --port 12014
