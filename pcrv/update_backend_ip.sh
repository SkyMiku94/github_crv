#!/bin/bash

# Récupérer l'External IP du backend (node-redis)
EXTERNAL_IP=$(kubectl get svc node-redis -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

# Vérifier si l'IP est vide (peut arriver si le LoadBalancer n'a pas encore assigné une IP)
if [ -z "$EXTERNAL_IP" ]; then
    echo "Erreur : Impossible de récupérer l'IP du backend."
    exit 1
fi

echo "Backend IP trouvée : $EXTERNAL_IP"

# Mettre à jour le ConfigMap avec la nouvelle IP
kubectl delete configmap frontend-config
kubectl create configmap frontend-config --from-literal=REACT_APP_API_URL="http://$EXTERNAL_IP:8080"

echo "ConfigMap mis à jour avec succès."

# Redémarrer le frontend pour appliquer les nouvelles variables d'environnement
kubectl rollout restart deployment front-deployment
echo "Redémarrage du frontend terminé."
