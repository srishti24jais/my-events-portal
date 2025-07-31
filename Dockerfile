# Use Eclipse Temurin JDK 21 (more reliable than OpenJDK)
FROM eclipse-temurin:21-jdk-alpine

# Install necessary packages
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy the entire backend directory
COPY EventsPortal-Backend/ .

# Make mvnw executable
RUN chmod +x mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# Create a non-root user
RUN addgroup -g 1001 -S javauser && \
    adduser -S javauser -G javauser -u 1001

# Change ownership of the app directory
RUN chown -R javauser:javauser /app

# Switch to non-root user
USER javauser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/api/health || exit 1

# Run the application
CMD ["java", "-jar", "target/EventsPortal-Backend-0.0.1-SNAPSHOT.jar"] 