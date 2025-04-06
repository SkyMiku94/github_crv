# # Étape 1 : Build de l'application React
# FROM node:16 AS builder 
# WORKDIR /usr/src/app
# COPY package*.json yarn.lock ./
# RUN yarn install
# COPY ./ ./
# ENV REACT_APP_API_URL=http://node-redis:8080
# RUN yarn build

# # Étape 2 : Serveur Nginx
# FROM nginx:alpine
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html 
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]  

# # Étape 1 : Build de l'application React
# FROM node:16 AS builder
# WORKDIR /usr/src/app
# COPY package*.json yarn.lock ./
# RUN yarn install
# COPY ./ ./

# # Assure que l'URL de l'API backend est injectée au build
# ARG REACT_APP_API_URL
# ENV REACT_APP_API_URL=$REACT_APP_API_URL
# RUN yarn build

# # Étape 2 : Serveur Nginx
# FROM nginx:alpine
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


FROM node:18 AS builder 
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ./ ./

RUN yarn build

EXPOSE 80
CMD ["yarn","start"]
