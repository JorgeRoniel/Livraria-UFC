FROM eclipse-temurin:19-jdk-alpine

WORKDIR /app

COPY target/OrderServer2-1.4-SNAPSHOT-jar-with-dependencies.jar app.jar

EXPOSE 1099

ENTRYPOINT ["java", "-jar", "app.jar"]