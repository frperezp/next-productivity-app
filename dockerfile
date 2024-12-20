# It uses node:18-alpine as the base image for the Node.js application
FROM node:18-alpine

# It installs the nodemon package globally for monitoring and watching the backend Express server
# RUN npm install -g nodemon

# Creating the working directory named `app`
WORKDIR /app

# Copying all the tools and dependencies in the package.json file to the working directory `app`
COPY package.json .

#Installing all the tools and dependencies in the container
RUN npm install

#Copying all the application source code and files to the working directory `app`
COPY . .

ENV REACT_APP_BASE_URL=http://192.168.1.179:5000/tasks

#Exposing the container to run on this port 3000
EXPOSE 3000

#Command to start the Docker container for the backed server application
CMD ["npm", "start"]