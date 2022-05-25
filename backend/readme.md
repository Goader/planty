# Backend

## Docker Compose

Docker Compose is a tool for running multiple docker containers in a single terminal statement. It allows a wide variety of different configurations for them. For instance, it is very convenient to store some major configuration as an environment variable. Then you can easily change them at the level `docker-compose.yml` file, no need to build a new image with altered configuration or change the existing one.

#### Configuration file

`docker-compose.yml` specifies different containers, the key `image` means that the image is being downloaded from somewhere, whereas `build` tells you it needs to be built (`docker-compose up` will handle it, but you should have files prepared for building).

Another important key is `restart`, if it is set to `always` - container will restart after each time you try to stop it or it faces an exception. So often you should better change it to `unless-stopped` while developing.

All the items specified under `environment` key will be declared and initialized as an environment variables.

`hostname` specifies the name of the host in the docker network. If you try to connect to the service outside of docker container, just use `localhost`.

`ports` - all the port mappings, without this you won't be able to connect to any port of the applications running inside the container.

#### Usage

Use `docker-compose up` to run all the services specified in the `docker-compose.yml` file. 

If you have changed the files for the docker container make sure to rebuild it, `docker-compose up` does not do it, it will run the old containers each time. Run `docker-compose build` to rebuild containers.

Sometimes you neeed to clean all the data from the database you have deployed locally. Usually there is a volume pinned to such container. Volume is an external place for your container to store data. It does not disappear when the container is stopped or even deleted. Use `docker volume ls` to check the volumes you have. Run `docker volume rm <id>` to remove the corresponding volume.

Use `docker image ls` to check all the built images you have, `docker container ls -a` - all the containers, inactive containers too, that's why there's `-a`. `docker ps` - currently running containers. Use `rm <id>` instead of `ls` in these commands to remove them.
