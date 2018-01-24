# How to use

## Preparation

We need to prepare SSH keys for the workshop.

```
ssh-keygen -b 2048 -t rsa -C workshop -f workshop
```

Make sure you have the most recent version of Digital Oceans CLI.

```
brew update && brew upgrade doctl
```

Make sure you have a valid Digital Ocean CLI config with API credentails at e.g. ~/.config/doctl/config.yaml 

If you want, you can install ansible to perform some checks on all machines. Just make sure ansible and ansible-playbook is in your path



Get the SSH key fingerprint and add export it as environment variable

```
ssh-keygen -l -E md5 -f workshop.pub                                                                                                                                                                                                                                                                                                    ✘ 255
4096 MD5:47:11:de:ad:be:ef:12:34:56:78:89:20:06:5a:3a:94 some_user@some_computer(RSA)
```


## open the settings file and place the copied md5 hash behind the SSH_FINGERPRINT key. Example:
```
SSH_FINGERPRINT='5d:19:fc:cc:6b:fa:9c:62:2c:f9:2f:3d:23:19:9f:a0'
```
## review all other settings in the settings file. Workshop name, Participants, Machines (per Participant) etc...
Example for a Kubernetes Workshop with 20 participants and 3 machines per particpant, using an Ubuntu 16.04 Image:

```
#!/bin/sh
WORKSHOP='k8s-workshop'
PARTICIPANTS=20
MACHINES=3
SSH_FINGERPRINT='47:11:de:ad:be:ef:12:34:56:78:89:20:06:5a:3a:94'
UBUNTU_VERSION='ubuntu-16-04-x64'
```

## Create workshop environments for participants

```
./create_training_environment.sh
```

Executing this commands with the above environment variables will create 60 VMs. Make sure your Digital Ocean account has the appropriate limit for the creation of VMs/Droplets set.
What will be installed on each VM is managed by the user data file. In this example it is called 'docker-workshop-userdata' and is provided within the create_training_environment.sh script.

To get a list of the VM's and their IP's run the following command

```
doctl compute droplet ls --format Name,PublicIPv4 --tag-name docker-workshop > list.csv
```

This creates a CSV file that might be opened with Excel and than can be printed out to give each participant the information he needs to connect to his VM via SSH.

After the workshop is finished you can cleanup everything by running

```
doctl compute droplet delete $(doctl compute droplet list --format ID --no-header --tag-name docker-workshop )
```

