# ---- Stage 1: Build Angular App ----
FROM node:16.20.2 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all files and build Angular app
COPY . .
RUN npm run build --prod

# ---- Stage 2: Run with Nginx ----
FROM nginx:alpine

# Copy built Angular app from Stage 1
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Expose port 80
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
