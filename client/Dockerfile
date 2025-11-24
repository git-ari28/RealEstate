# ---------- Stage 1: Build frontend (Vite) ----------
FROM node:18-alpine AS build

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend source
COPY . .

# Build production files (creates /app/dist)
RUN npm run build


# ---------- Stage 2: Nginx to serve built frontend ----------
FROM nginx:alpine

# Ensure nginx html directory exists & is empty
RUN mkdir -p /usr/share/nginx/html && rm -rf /usr/share/nginx/html/*

# Copy your custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built Vite files from previous stage to nginx html folder
COPY --from=build /app/dist/. /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


