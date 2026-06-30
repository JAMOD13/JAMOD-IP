#!/bin/bash

echo -e "\n\e[1;32m[+] Starting Environment Setup...\e[0m"

# 1. System Packages Update & Install
echo -e "\n\e[1;34m[1/4] Installing core packages (Git, Node.js)...\e[0m"
pkg update -y && pkg upgrade -y
pkg install git nodejs -y

# 2. Project Dependencies Install
echo -e "\n\e[1;34m[2/4] Installing project dependencies (Express, UA-Parser)...\e[0m"
if [ -f package.json ]; then
    npm install
else
    npm init -y
    npm install express ua-parser-js
fi

# 3. Git Credentials Check
echo -e "\n\e[1;34m[3/4] Checking Git configurations...\e[0m"
read -p "Enter your GitHub Username: " git_user
read -p "Enter your GitHub Email: " git_email

git config --global user.name "$git_user"
git config --global user.email "$git_email"

echo -e "\e[1;32m[✓] Git identity configured successfully!\e[0m"

# 4. Completion Message
echo -e "\n\e[1;32m==================================================\e[0m"
echo -e "\e[1;32m[✓] SETUP COMPLETE! Environment is ready.\e[0m"
echo -e "\e[1;34m[*] Use 'node server.js' to start the application locally.\e[0m"
echo -e "\e[1;32m==================================================\e[0m\n"
