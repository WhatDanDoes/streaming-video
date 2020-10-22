streaming-video
===============

This documents the steps I took to setup a basic video streaming system using common open source Ubuntu tools and [node-media-sever](https://github.com/illuspas/Node-Media-Server).

# Purpose

I want a simple setup to stream video from my desktop system through a remote web server.

# Deep thoughts

Right off the bat I have the question of how to deploy the two parts of this system:

1. The part that actually streams the video
2. The web interface that allows viewers to consume via their browsers

Natually, I want to deploy this behind an nginx-proxy config. Hopefully I can get some certs for the streaming server along with the viewing portal.

# Set up

## Node Media Server

```
cd npm
npm install
```

# Test


# Development


# Production

```
npm install --production
```

```
docker-compose up --build -d
```
