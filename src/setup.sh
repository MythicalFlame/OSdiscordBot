#!/bin/bash
echo "--Setup for the OSdiscordBot project--"
#setup token
echo "Enter your bot token. If you wish to edit this through config.json instead, you may do so by leaving a blank line."
read token
if [ "$token" == "" ]; 
then 
  echo "Your token was not set. You can edit it in config.json."
else
  echo "Your token has been set."
  sed -i "s/^\t\"token\".*/\t\"token\": \"$token\"/" ./config.json
fi
echo "----------"
#setup clientid
echo "Enter your clientId (application ID). If you wish to edit this through config.json instead, you may do so by leaving a blank line."
read clientId
if [ "$clientId" == "" ]; 
then 
  echo "Your clientId was not set. You can edit it in config.json."
else
  echo "Your clientId has been set."
  sed -i "s/^\t\"clientId\".*/\t\"clientId\": \"$clientId\",/" ./config.json
fi
echo "----------"
#todo: delete unneeded commands
#ask to run update-commands.js
echo "Would you like to run update-commands.js to upload the commands to your bot? (y/n)"
read runUpdateCommands
if [ "$runUpdateCommands" == "y" ]
then
  echo "Running update-commands.js..."
  node ./update-commands.js
elif [ "$runUpdateCommands" == "n" ]
then
  echo "update-commands.js has not been automatically run. You must do so before using the bot."
else
  echo "Invalid input. Assuming the answer \"n\". update-commands.js has not been automatically run. You must do so before using the bot."
fi

echo "You have completed the setup process. Any setup you have denied will need to be done manually."
