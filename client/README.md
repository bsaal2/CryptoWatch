# Client

This is the client application for the CryptoWatch. It contains all the APIs needed to facilitate the Crypto watch application

## Technology Used

> React

> Bootstrap

> Mobx

> Axios

> React router


## Steps to run the application

```
a. Clone the source code from the repo
b. Client code lies in the server directory. Navigate to it
   cd client/
c. Install the application dependencies
   npm install
```

## Docker Implementation

Dockerfile has been created in the root of the client project. It is specified with the name Dockerfile. Building the images
has a dependency, which has been specified in the build-config folder.

We need the docker hub to push the images.

Below is the step to create the docker image

```
    1. docker build . -t {image_tagname}
    2. docker push {image_tagname}
```

## Contributor

Bishal Giri