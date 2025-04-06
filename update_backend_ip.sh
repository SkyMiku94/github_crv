#!/bin/bash
# update-frontend-config.sh

# Récupérer l'IP externe du backend
EXTERNAL_IP=$(kubectl get svc node-redis -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

while [ -z "$EXTERNAL_IP" ]; do
  echo "En attente de l'IP externe..."
  sleep 5
  EXTERNAL_IP=$(kubectl get svc node-redis -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
done

echo "IP du backend détectée : $EXTERNAL_IP"

# Mise à jour du ConfigMap
kubectl create configmap frontend-config \
  --from-literal=REACT_APP_API_URL="http://${EXTERNAL_IP}:8080" \
  --dry-run=client -o yaml | kubectl apply -f -

# Redémarrage progressif
kubectl rollout restart deployment/front-deployment

echo "Configuration mise à jour avec succès"