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

The following section is a mess. I've been documenting the various production software I've tried. As it turns out, video with OBS is quite easy. Real-time audio production is much trickier. Apart from the OBS installation, most of the rest is just helping me keep track of all the junk I've installed on my machine.

## OBS

Installation adapted from: https://obsproject.com/


Install dependencies:

```
sudo apt install mesa-utils ffmpeg
```

Make sure OpenGL is installed:

```
glxinfo | grep "OpenGL"
```

If not, follow the recommended way to install.

Add OBS repository and install:

```
sudo add-apt-repository ppa:obsproject/obs-studio
sudo apt update
sudo apt install obs-studio
```

### Streaming address

The address to which you stream depends on the endpoints you specify. In _Settings > Stream_:

- Service: _Custom_
- Server: _rtmp://192.168.2.1:1935/live_
- Stream Key: _stream_

With these settings you will configure `site/.env` to look like this:

```
TITLE=streaming-video
STREAM_URL=http://192.168.2.1:8000/live/stream.flv
```

## JACK and voice changers

From https://digitalsuperpowers.com/blog/2019-03-16-voice-changers.html

```
sudo apt-get install qjackctl jack-rack tap-plugins pulseaudio-module-jack
qjackctl
jack-rack
```

## VLC

```
sudo apt install vlc-bin
sudo apt install vlc-plugin-access-extra libbluray-bdj libdvdcss2
```

# Audio Mixing Experimentation

I've already installed a bunch of software willy nilly. I guess I'm keeping track now.

- Jack
- Pulseaudio

```
pavucontrol
sudo apt install paprefs
paprefs
```

# Equalizer

Info found at https://askubuntu.com/questions/72679/is-there-any-sound-enhancers-equalizer and https://askubuntu.com/questions/980876/how-do-i-start-pulseaudio-equalizer/982556#982556

```
sudo apt-get install pulseaudio-equalizer
qpaeq
pactl load-module module-equalizer-sink
pactl load-module module-dbus-protocol
```

```
sudo apt install jackeq
jackeq
```

```
sudo apt install jamin
```

```
sudo add-apt-repository ppa:mikhailnov/pulseeffects -y
sudo apt update
sudo apt install pulseeffects pulseaudio --install-recommends
```

What is this? https://github.com/masmu/pulseaudio-dlna

It's supposed to be easy to use.

# CAVA

Visualizer

```
sudo add-apt-repository ppa:tehtotalpwnage/ppa
sudo apt update
sudo apt install cava
```

