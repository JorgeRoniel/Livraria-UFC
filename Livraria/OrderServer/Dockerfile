FROM eclipse-temurin:19-jdk-alpine

WORKDIR /app

COPY target/OrderServer-1.0-SNAPSHOT.jar app.jar

EXPOSE 1099

ENTRYPOINT ["java", "-jar", "app.jar"]