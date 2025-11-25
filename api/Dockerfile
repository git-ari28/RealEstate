# Backend: Node + Express API
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
# If you have package-lock.json, npm ci is better; otherwise use npm install
RUN npm install --omit=dev

# Copy rest of the backend code
COPY . .

# Set port (adjust if your app uses a different one)
ENV PORT=5000
EXPOSE 5000

# Start command (make sure "start" exists in api/package.json scripts)
CMD ["npm", "start"]


