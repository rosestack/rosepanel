#!/bin/bash

if [ "$EUID" -ne 0 ]; then
	echo "Please use the [root] user to execute the installation script!"
	exit 1
fi

# Activate nvm
source "/root/.nvm/nvm.sh"

# Use lts node
nvm use --lts

# Install dependencies
npm install

# Run rosepanel
npm run start
