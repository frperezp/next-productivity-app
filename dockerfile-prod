# Use a Node.js image to build the React app
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

ENV REACT_APP_BASE_URL=http://192.168.1.179:5000/tasks

# Build the React application
RUN npm run build

# Use a lightweight server to serve the build files
FROM nginx:alpine

# Copy the build files to the NGINX public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
