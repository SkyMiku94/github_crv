#!/bin/bash

# Appliquer les fichiers YAML
echo "📦 Déploiement des ressources Kubernetes..."
kubectl apply -f config-map.yml
kubectl apply -f node-redis-deployment.yml
kubectl apply -f redis-deployment.yml
kubectl apply -f react-deployment.yml


sleep 10
# Mettre à jour l'adresse IP du backend
echo "🔧 Mise à jour de l'IP backend..."
./update_backend_ip.sh

echo "✅ Déploiement terminé."
