# Backend

## MongoDB

To get access to the database, which is in the replica set mode, you need to:

* Linux
    
    Modify `/etc/hosts` file by adding `planty-mongodb` as one of the aliases of `127.0.0.1`. It may look like this `127.0.0.1 localhost planty-mongodb`.

* Windows

    Mofify `C:\Windows\System32\drivers\etc\hosts` file the same way as for the Linux.

After this run the `.docker/init.sh` script to generate a key for the database.
