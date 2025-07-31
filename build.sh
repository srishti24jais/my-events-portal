#!/bin/bash
set -e

echo "Building Events Portal Backend..."

# Navigate to backend directory
cd EventsPortal-Backend

# Make mvnw executable
chmod +x mvnw

# Build the application
./mvnw clean package -DskipTests

echo "Build completed successfully!" 