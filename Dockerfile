# Use an official Node runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json .

RUN apt-get update && apt-get install -y xdg-utils

# Install app dependencies
RUN npm install
RUN npm install -g serve

# Copy the rest of the app's source code to the container
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Command to start your React app
CMD ["sh", "-c", "BROWSER=none serve -s build"]