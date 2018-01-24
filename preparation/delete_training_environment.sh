#!/bin/bash

# to work with this script you need to have a working Digital Ocean CLI available
# it can be found at https://github.com/digitalocean/doctl
# and can be installed via homebrew

#please inspect Workshop settings in the ./settings file and modify it to your needs


source ./settings

#some checks
#check if doctl is logged in and can talk to it's API
if ! doctl account get &> /dev/null; then
  echo "doctl has issues talking to the API. Did you set up doctl correctly and provided a correct auth token?" ; exit 1
fi

#check if the provided fingerprint is available on your local ssh agent
if ! ssh-add -l -E md5 |grep $SSH_FINGERPRINT &> /dev/null; then
  echo "Your local ssh-agent does not provide the ssh key provided in the settings. Please check." ; exit 1
fi

#check if the digital ocean tag (=your workshop name in the settings) you provided is available. If not, we'll create it
if ! doctl compute tag list |grep $WORKSHOP &> /dev/null; then
  echo "The Tag ${WORKSHOP} seems not to be available. We'll create it." ; doctl compute tag create ${WORKSHOP}
else
  echo "Tag ${WORKSHOP} found. Continuing..."
fi

echo "Removing Droplets with the ${WORKSHOP} Tag"
doctl compute droplet delete -f $(doctl compute droplet list --format ID --no-header --tag-name  ${WORKSHOP} )

