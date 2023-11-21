#!/bin/bash

NVM_VERSION="0.39.5"

ROSEPANEL_DIR="/www/rosepanel"

SYSTEM_SERVICE_FILE="$ROSEPANEL_DIR/scripts/rosepanel.service"
SYSTEM_SERVICE_DIST="/etc/systemd/system/rosepanel.service"

print_error() {
	printf "\e[1;31m%s\e[0m\n" "---Rosepanel---"
	echo -e "\e[1;31m => (Error) ($2): $1\e[0m" >&2
	printf "\e[1;31m%s\e[0m\n" "---------------"
}

print_warning() {
	printf "\e[1;33m%s\e[0m\n" "---Rosepanel---"
	echo -e "\e[1;33m => (Warning): $1\e[0m"
	printf "\e[1;33m%s\e[0m\n" "---------------"
}

print_info() {
	echo -e "\e[1;32m=> (Info): $1\e[0m"
}

print() {
	echo -e "==> $1\e[0m"
}

function setup_system() {
	print_info "Updating system packages ..."
	apt-get update -qq

	print_info "Upgrading system packages ..."
	apt-get upgrade -y
}

function setup_firewall() {
	print_info "Setup firewall ..."

	print "Installing ufw ..."
	apt-get install -y ufw -qq

	print "Enabling ufw..."
	ufw enable

	print "Adding ports ..."
	ufw allow 20/tcp   # FTP data transfer
	ufw allow 21/tcp   # FTP control (command)
	ufw allow 22/tcp   # SSH (Secure Shell)
	ufw allow 80/tcp   # HTTP (Web traffic)
	ufw allow 8118/tcp # Rosepanel

	ufw enable
	ufw default deny
	ufw reload
}

function setup_rosepanel() {
	print_info "Setup rosepanel..."

	print "Installing git..."
	apt-get install -y git -qq

	function setup_nvm() {
		print_info "Setup node version manager (NVM)"

		# Removed nvm
		rm -rf ~/.nvm

		# Unset nvm
		export NVM_DIR=

		# Install nvm
		curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/v$NVM_VERSION/install.sh" | NVM_DIR="/root/.nvm" bash

		# Make it executable
		export NVM_DIR="$HOME/.nvm"
		[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

		# Activate nvm
		source "$HOME/.nvm/nvm.sh"

		# Install lts
		nvm install --lts
	}

	setup_nvm

	if systemctl is-active rosepanel &>/dev/null; then
		print_warning "Stopping existing Rosepanel service..."
		systemctl stop rosepanel
	fi

	if [ -d "$ROSEPANEL_DIR" ]; then
		rm -r "$ROSEPANEL_DIR"
	fi

	print "Cloning Rosepanel repository..."
	mkdir -p "$ROSEPANEL_DIR"
	git clone https://github.com/rosestack/rosepanel.git "$ROSEPANEL_DIR"

	print "Make scripts executable ..."
	chmod +x "$ROSEPANEL_DIR/scripts/start.sh"

	print "Copying system service file..."
	cp "$SYSTEM_SERVICE_FILE" "$SYSTEM_SERVICE_DIST"
}

function run_rosepanel() {
	print_info "Starting rosepanel..."

	if systemctl is-active rosepanel &>/dev/null; then
		print_warning "Stopping existing Rosepanel service..."
		systemctl stop rosepanel
	fi

	systemctl daemon-reload
	systemctl enable rosepanel
	systemctl start rosepanel

	journalctl -u rosepanel -f
}

function main() {
	setup_system
	setup_firewall
	setup_rosepanel
	run_rosepanel
}

if [ "$EUID" -ne 0 ]; then
	print_error "Please use the [root] user to execute the installation script!" "sudo-privilege"
	exit 1
fi

main

exit 0
