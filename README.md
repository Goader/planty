# Planty

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
* `conda env update --file conda.yml --prune` - updates environment (for example, someone added a new library to the `conda.yml` environment specification, and you want to keep up with the changes), option `--prune` will uninstall all the libraries, which you have installed previously, but which are not specified in the `conda.yml` anymore
* `conda env export --name planty > conda.yml` - exporting a current environment specification to the `conda.yml` file (delete the prefix path from the file either by hand, or using `conda env export --name planty | <wsl?> grep -v "^prefix: " > conda.yml`, it does not have any effect, so there is no need of it)

NOTE: if you update the library version, add a new library or remove the existing, then update the `conda.yml` file. It must be up to date and contain a minimal requirements to run the application.
