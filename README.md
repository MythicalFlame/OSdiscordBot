# OSdiscordBot
An open source discord bot I am developing. The goal is to make a bot that you can easily self-host, without having to pay to unlock features.

# Instructions
This is currently very basic, I am planning to add more functionality. But if you want to use it in it's early stages, here you go:

Note: if you are using replit as a hosting solution, then you will need to modify your .replit and package.json files to work with this. You must also store your token and clientId with a secret.
1. run `git clone https://github.com/MythicalFlame/OSdiscordBot.git`
## Using setup.sh (experimental, linux only)
**Note: Do NOT do this if you are on *any* online editor/hosting solution. It uses config.json which will be exposed to anyone that views your code.**

2. cd into the `src` directory and run `bash setup.sh`
3. Fill out the questions it asks you
## Manually
2. change the options `clientId` and `token` in `/src/config.json`
3. cd into the `src` directory and then run `node update-commands.js`
