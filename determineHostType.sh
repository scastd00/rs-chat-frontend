#!/bin/bash

# This script is used to export the necessary environment variables to support the automatic connection
# to the home server. If this computer has an IP starting by 192.168.*.* then it is considered to be at home
# and the connection to the home server is established directly. Otherwise, the connection to the home server
# is by requesting the IP to the DuckDNS server.

main() {
  # Check if the computer is at home
  if [[ $(hostname -I) =~ ^192\.168\.0\..* ]]; then
    # The computer is at home
    echo 'VITE_SERVER_HOST=192.168.0.100' >.env
  else
    # The computer is away home
    echo 'VITE_SERVER_HOST=rs-chat.duckdns.org' >.env
  fi
}

main
