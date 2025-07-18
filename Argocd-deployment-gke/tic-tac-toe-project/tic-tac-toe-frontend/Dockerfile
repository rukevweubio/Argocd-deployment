# Use a lightweight Node.js image for building
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Use nginx base image
FROM nginx:alpine

# Copy built React app to /var/www/html instead of default /usr/share/nginx/html
RUN rm -rf /var/www/html/*   # Clear existing content if any
COPY --from=builder /app/build /var/www/html

# Copy your nginx.conf as is
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
