

# Use JDK 17 as base image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from your build output to the container
COPY target/pulse-backend-0.0.1-SNAPSHOT.jar /app/pulse-events-backend.jar

# Expose the port your application will use
EXPOSE 8080

# Define the command to run your application
CMD ["java", "-jar", "pulse-events-backend.jar"]
