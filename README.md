streaming-video
===============

This documents the steps I took to setup a basic video streaming system using common open source Ubuntu tools and [node-media-sever](https://github.com/illuspas/Node-Media-Server).

# Purpose

I want a simple setup to stream video from my desktop system through a remote web server.

# Deep thoughts

Right off the bat I have the question of how to deploy the two parts of this system:

1. The part that actually streams the video
2. The web interface that allows viewers to consume via their browsers

Natually, I want to deploy this behind an [nginx-proxy/lets-encrypt](https://libertyseeds.ca/2018/04/26/An-nginx-proxy-lets-encrypt-Docker-Composition/) composition. Hopefully I can get some certs for the streaming server along with the viewing portal.

# Set up

## Node Media Server

From the project directory:

```
cd nms
cp .env.example .env
npm install
```

### Development

My objective is to get this working in a proper production-like environment. The `docker-compose.yml` contained in the `nms` directory is meant for development. To start the development server, execute:

```
docker-compose up -d
```

This works great if you are doing manual testing or a local deployment. If you want to allow outside network access, be sure to open the relevant ports on your router.

You can access the `nms` admin panel at http://localhost:8000/admin. I haven't yet figured out a sneaky way to serve the app from the root directory.

## Viewer App

From the project directory:

```
cd site
cp .env.example .env
npm install
```

### Test

Run all:

```
npm test
```

Run one test file:

```
NODE_ENV=test npx jasmine spec/landingPageSpec.js
```

# Development


# Production

```
npm install --production
```

```
docker-compose up --build -d
```


# Ubuntu Production Software

## OBS

https://obsproject.com/


