#!/bin/bash

# to work with this script you need to have a working Digital Ocean CLI available
# it can be found at https://github.com/digitalocean/doctl
# and can be installed via homebrew

# !! please inspect Workshop settings in the ./settings file and modify it to your needs !!


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


search_result=$(doctl compute droplet ls --format ID --no-header --tag-name ${WORKSHOP})
if [ -z "$search_result" ]; then
  echo "Found no droplets"
else
  echo "Found droplets"
  doctl compute droplet rm "$search_result" --force
fi

for participant_no in $(seq 1 "${PARTICIPANTS:=1}"); do
  for machine_no in $(seq 1 "${MACHINES:=1}"); do
    sleep 5
    command="doctl compute droplet create k8s-workshop-${participant_no}-0${machine_no} --image $UBUNTU_VERSION --region fra1 --size 2GB --ssh-keys ${SSH_FINGERPRINT:=you-need-to-provide-a-valid-ssh-fingerprint} --tag-name ${WORKSHOP} --user-data-file ./workshop-userdata"
    #echo "$command"
    eval "$command"
  done
done

echo "Waiting some seconds to generate the IPs"
sleep 15
doctl compute droplet ls --no-header --format Name,PublicIPv4 --tag-name ${WORKSHOP} > ${LIST_FILE}.csv

#Generate Ansible inventory File from list.csv
>./hosts
input=${LIST_FILE}.csv
unset IFS # stupid doctl tells you giving back a csv but returns a tab separated list. 
while read -r do_name do_ip
do 
  echo "${do_name} ansible_host=${do_ip} ansible_user=root" >> ./hosts
done < "$input"

cat <<EOF
Generation is complete.
You can lists your hosts with 
   cat ${LIST_FILE}.csv

If you have Ansible installed, you can check the state of all droplets with the following command:
   ansible all -i hosts  -mping

Furthermore, you can execute a command on all droplets with the following command (here as an example docker ps)
   ansible all -i hosts -a "docker ps"

EOF
