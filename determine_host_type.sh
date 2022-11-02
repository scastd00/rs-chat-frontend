#!/bin/bash

# This script is used to export the necessary environment variables to support the automatic connection
# to the home server. If this computer has an IP starting by 192.168.*.* then it is considered to be at home
# and the connection to the home server is established directly. Otherwise, the connection to the home server
# is by requesting the IP to the DuckDNS server.

#######################################
# Sets the environment variables to support the connection to the server
# Arguments:
#  None
#######################################
function main() {
  local hostname
  hostname=$(hostname -I)

  # Check if the computer is at home
  if [[ "$hostname" =~ ^192\.168\.0\..* ]]; then
    # The computer is at home
    echo 'VITE_PROD_HOST=192.168.0.100' >.env
    echo 'VITE_DEV_HOST=127.0.0.1' >>.env
    exit 0
  fi

  # The computer is away home
  if [[ "$hostname" =~ ^192\.*\.*\.* || "$hostname" =~ ^10\.*\.*\.* ]]; then
    # The computer is connected to the mobile network
    echo 'VITE_PROD_HOST=rs-chat.duckdns.org' >.env
    echo 'VITE_DEV_HOST=127.0.0.1' >>.env
    exit 0
  fi

  # The computer is deployed in Vercel
  echo 'VITE_PROD_HOST=rs-chat.duckdns.org' >.env
  echo 'VITE_DEV_HOST=rs-chat.duckdns.org' >>.env
}

main "$@"
