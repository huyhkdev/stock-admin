# Stage 1: Build the app
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Copy the rest of the app's source code
COPY . .

# Build the app for production
RUN yarn build

# Stage 2: Serve the app with Node.js
FROM node:20

# Set working directory
WORKDIR /app

# Copy the build files from the builder stage
COPY --from=builder /app/dist /app/dist

# Install serve to serve the build
RUN yarn global add serve

# Expose port 3001 for the web server
EXPOSE 3001

# Start the app using the 'serve' package
CMD ["serve", "-s", "dist", "-l", "3001"]
