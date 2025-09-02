# Base image with the specified Node.js version
FROM node:20.11.0

# Install system dependencies needed for image optimization (sharp/libvips)
RUN apt-get update && apt-get install -y \
    libvips-dev \
    libc6-dev \
    libjpeg-dev \
    libpng-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node dependencies
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
