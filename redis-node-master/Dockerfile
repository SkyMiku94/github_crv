# FROM node:16

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --legacy-peer-deps

# COPY ./ ./

# EXPOSE 3000

# ENV REDIS_URL=redis://some-redis:6379
# ENV REDIS_REPLICAS_URL=$REDIS_URL
# ENV PORT=3000

# CMD ["node","main.js"]

# Utilise une image officielle Node.js comme image de base
FROM node:18-alpine

# Crée un répertoire de travail dans le container
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json (si tu as un fichier package-lock.json)
COPY package*.json ./

# Installe les dépendances
RUN npm install --legacy-peer-deps


# Copie le code de ton application dans le container
COPY . .

# Expose le port que ton application utilise
EXPOSE 3000

# Définit la variable d'environnement pour activer l'accès à Redis
ENV REDIS_URL=redis://redis:6379
ENV REDIS_REPLICAS_URL=redis://redis-replicas:6379

# Commande pour démarrer ton serveur Node.js
CMD ["node", "main.js"]
