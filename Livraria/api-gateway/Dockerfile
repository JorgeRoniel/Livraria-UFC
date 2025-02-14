FROM maven:latest AS build

COPY src /app/src
COPY pom.xml /app
COPY lib/InterfaceRMI-1.5-SNAPSHOT.jar /app/lib/InterfaceRMI-1.5-SNAPSHOT.jar
COPY lib/OrderServer-1.0-SNAPSHOT.jar /app/lib/OrderServer-1.0-SNAPSHOT.jar


WORKDIR /app

RUN mvn install:install-file -Dfile=/app/lib/InterfaceRMI-1.5-SNAPSHOT.jar -DgroupId=org.example -DartifactId=InterfaceRMI -Dversion=1.5-SNAPSHOT
RUN mvn install:install-file -Dfile=/app/lib/OrderServer-1.0-SNAPSHOT.jar -DgroupId=org.example -DartifactId=OrderServer -Dversion=1.0-SNAPSHOT
RUN mvn clean install -DskipTests

FROM eclipse-temurin:19-jre-alpine

COPY --from=build /app/target/api-gateway-0.0.1-SNAPSHOT.jar /app/app.jar

WORKDIR /app

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]