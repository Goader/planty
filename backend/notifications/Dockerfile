FROM ubuntu

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

WORKDIR /app

COPY . .

RUN python3 -m pip install -r requirements.txt --no-cache-dir
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "12012"]