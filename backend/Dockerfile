

# Use JDK 17 as base image
FROM openjdk:17-jdk-slim

ARG JAR_FILE=target/pulse-backend-0.0.1-SNAPSHOT.jar

ADD ${JAR_FILE} pulse-events.jar

# Expose the port your application will use
EXPOSE 8089

ENTRYPOINT exec java -jar /pulse-events.jar
