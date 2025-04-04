#!/bin/bash

echo "🛑 Arrêt des ressources Kubernetes..."
kubectl delete -f react-deployment.yml
kubectl delete -f redis-deployment.yml
kubectl delete -f node-redis-deployment.yml
kubectl delete -f config-map.yml

echo "🧹 Arrêt du tunnel minikube..."
sudo pkill -f "minikube tunnel"

echo "🛑 Arrêt de minikube..."
minikube delete

echo "✅ Tout est arrêté proprement."
