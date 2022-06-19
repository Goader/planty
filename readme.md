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

## :fleur_de_lis: Code Style

### Python

* using spaces (4 spaces for an indent)
* using typing annotations (both arguments and return values)
* using snake case
* **_following PEP-8_**
* using private attributes with the `_` prefix and properties to access them or modify
* using immutable classes everywhere it can be done
* avoiding big constructions (ex. skipping variables creating by passing results straight to the next function if it becomes hard to read), if it does not affect the efficiency noticeably
* commenting how different chunks of code work if they are not that obvious (ex. some algorithms)
* aligning splitted function calls, declarations and so on..


## :trident: Definition of Done

Every point has different levels of completion. To count it satisfied you must satisfy **_at least_** level. **To satisfy level X you must satisfy each level below X too!**

* **_code works!_**
  * **_perfectly_**: you have written automatic tests which can be easily run and they pass
  * **_at least_**: you have thoroughly tested the code by hand, tried out different edge cases and the program works as expected
  * **_won't even be reviewed_**: program with your code does not fail the tests written before (unless it is a major change and previous tests need to be update, in that case you must update the tests), all the tests must pass!
* **_code reviewed!_**
  * **_perfectly_**: 2 or more people have reviewed your code
  * **_at least_**: one person has reviewed your code, all the comments have been taken into consideration, all the issues have been resolved
  * **_do not even try_**: it is forbidden to merge pull requests without a review, it is also forbidden to commit straight to _dev_, except of updates of readme or any other file, which does not affect the program execution
* **_satisfies acceptance criteria!_**
  * **_perfectly_**: your code 100% satisfy acceptance criterias
  * **_at least_**: your code does not satisfy some minor acceptance criterias, but they have been discussed internally and with a client
  * **_a bad idea_**: your changes cannot affect the acceptance criterias which have been already satisfied, but they are not satisfied anymore
* **_merged!_**
  * **_perfectly_**: you have rebased your branch onto the branch you are about to merge in, pull request is ready to be merged in one click
  * **_at least (still better go for "perfectly")_**: you have created a pull request, all the conflicts with the target branch have been resolved, the branch has been merged, the pull request is closed
  * **_you should not_**: your branch cannot have any ongoing unresolved conflicts with the target branch
