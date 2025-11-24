# Build stage (React)
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build        # creates /dist (Vite) or /build (CRA)

# Serve with nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built frontend to nginx
COPY --from=build /app/dist /usr/share/nginx/html     # <-- Vite (change to /build for CRA)

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

