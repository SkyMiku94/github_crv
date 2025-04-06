# Getting Started 

This project is a uni project

## Available Scripts

In the project directory, run:

### `minikube start`

if minikube command doesn't work install it on:

https://minikube.sigs.k8s.io/docs/start/

### `./start.sh`

This script will setup the cluster and all the files needed.  

When it prompt "**En attente de l'IP externe...**"  you will need to run in  another terminal:

### `minikube tunnel`

do `kubectl get svc` to see the ip address used by the tunnel with the port number.

do `kubectl get pods` to see if all the pods are running

do `minikube dashboard` in another terminal for a clean view 

It can be a little slow to set it all up but don't worry !

### `./shutdown.sh`

This script will delete minikube container.

## In case the external IP is on 127.0.0.1:

Open [http://localhost:8080](http://localhost:8080) for the backend 

Open [http://localhost:3000](http://localhost:3000) for grafana ( user admin / pass admin123)

Open [http://localhost:9090](http://localhost:9090) for prometheus

Open [http://localhost:80](http://localhost:80) for the frontend

