# Planty :herb:

<p align="center">
  <img src="https://user-images.githubusercontent.com/45573077/161089548-f4432533-6c42-40fe-8a5b-839ebfec7f47.png" />
</p>

Web application designed to help you make plant care a pleasant hobby, not a burden.

## :gear: Getting started!

```git
git clone git@github.com:Goader/planty.git
```

### Backend

#### Install Anaconda

* Windows 64-bit
  * Download [graphical installer](https://repo.anaconda.com/archive/Anaconda3-2021.11-Windows-x86_64.exe)
  * Run the installer
* MacOS
  * Download [command line installer](https://repo.anaconda.com/archive/Anaconda3-2021.11-MacOSX-x86_64.sh) by hand or use `curl -O https://repo.anaconda.com/archive/Anaconda3-2021.11-MacOSX-x86_64.sh`
  * Run the script to install Anaconda
* Linux 64-bit (x86)
  * Download [command line installer](https://repo.anaconda.com/archive/Anaconda3-2021.11-Linux-x86_64.sh) by hand or use `curl -O https://repo.anaconda.com/archive/Anaconda3-2021.11-Linux-x86_64.sh`
  * Run the script to install Anaconda - `bash Anaconda3-2021.11-Linux-x86_64.sh`

During the installation process specify a location for Anaconda, it is also recommended to allow the installer to run `conda init`.

#### Using Anaconda

You can look at the [CONDA CHEAT SHEET](https://docs.conda.io/projects/conda/en/4.6.0/_downloads/52a95608c49671267e40c689e0bc00ca/conda-cheatsheet.pdf) to find all the most popular commands!

* `conda env create -f conda.yml` - creating environment from the `.yml` file
* `conda env list` - listing the existing environments (`planty` must be among them)
* `conda activate planty` - activating `planty` environment
* `conda deactivate` - deactivating current environment
* `pip install -r requirements.txt` - installing all the PIP packages required to run an application
* `pip freeze > requirements.txt` - writing all the currently installed packages to `requirements.txt` (do this while the conda environment is activated)

NOTE: if you update the library version, add a new library or remove the existing, then update the `requirements.txt` file. It must be up to date and contain a minimal requirements to run the application.

### Frontend

#### Install node.js and npm

* Windows
  * Download node.js installer from [official website](https://nodejs.org/en/download/)
  * Run installer
* MacOS
  * Run `brew install yarn` 
* Linux (Ubuntu/Debian)
  * Using node repository
    ```bash
    # Using Ubuntu
    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs

    # Using Debian, as root
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
    apt-get install -y nodejs
    ```
  * Using node version manager
    * Install node version manager
      ```bash
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
      ```
    * Install `node` version 16 (latest LTS) using `nvm`
      ```bash
      nvm install 16
      ```
Verify that `node` and `npm` commands work in your terminal
```bash
node -v
npm -v
```

#### Install yarn
Install yarn using `npm`
```bash
npm install -g yarn
```

#### Using yarn

You can use this [guide](https://yarnpkg.com/getting-started/usage) or look [here](https://yarnpkg.com/cli) to find all the commands you need!

* `yarn add [package]` - adding a new package to `package.json` and `yarn.lock`
* `yarn remove [package]` - removing a package from `package.json` and `yarn.lock`
* `yarn install` - installing packages specified in the `package.json` and `yarn.lock` (use this to run the application)
* `yarn run [script]` - running a script specified in the `package.json`
* feel free to add new useful commands!


