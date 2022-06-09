FROM python:3.9

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Warsaw

RUN apt-get update && apt-get install -y \
	msmtp \
	openssl \
	ca-certificates \
	software-properties-common \
	python3-pip \
	git \
	perl \
	curl \
	make \
	build-essential \
	wget \
	gcc \
	netcat


# DOWNLOAD CERTS -------------------------
RUN update-ca-certificates

WORKDIR /app

COPY . .

RUN python3 -m pip install uvicorn --no-cache-dir
RUN python3 -m pip install -r requirements.txt --no-cache-dir
CMD ["bash", "run-server.sh"]
