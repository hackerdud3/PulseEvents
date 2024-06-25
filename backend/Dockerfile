

# Use JDK 17 as base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged Spring Boot application JAR file into the container at /app
COPY target/pulse-backend-0.0.1-SNAPSHOT.jar /app/app.jar


# Expose the port that your Spring Boot application listens on (default 8080)
EXPOSE 8080

# Command to run the Spring Boot application when the container starts
CMD ["java", "-jar", "app.jar"]

