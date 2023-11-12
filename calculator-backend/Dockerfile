FROM eclipse-temurin:11-jdk-alpine
RUN apk update && \
    apk add maven
COPY . .
RUN mvn package -Dmaven.test.skip
EXPOSE 8080
CMD ["java", "-jar", "target/calculator-backend-0.0.1-SNAPSHOT.jar"]
