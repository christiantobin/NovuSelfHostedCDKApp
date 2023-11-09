#!/bin/bash

# Update the installed packages and package cache on your instance
yum update -y

# Install Docker
yum install -y docker

# Start the Docker service
service docker start

# Ensure that Docker starts at every server reboot
chkconfig docker on

# Pull the Novu image from Docker Hub
docker pull novu/novu

# Create a Novu configuration file
cat > novu.env << EOF
NOVU_API_KEY=your-api-key
NOVU_MONGO_URI=your-mongodb-uri
NOVU_PORT=3000
EOF

# Run the Novu Docker container with the configuration file
docker run -d --restart unless-stopped --env-file novu.env \
  -p 3000:3000 \
  --name novu novu/novu
