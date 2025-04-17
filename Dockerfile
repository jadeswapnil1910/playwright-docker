# Use official Playwright base image
FROM mcr.microsoft.com/playwright:v1.51.1-jammy

# Set working directory
WORKDIR /app

# Copy package files first to install deps (cache better)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy remaining project files
COPY . .

# Install Java (if needed for your tests)
RUN apt-get update && apt-get install -y openjdk-11-jre-headless

# Set JAVA_HOME
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64

# Default command to run tests
CMD ["npm", "test"]
