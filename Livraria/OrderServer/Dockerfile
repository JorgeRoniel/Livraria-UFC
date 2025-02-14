FROM maven:latest AS build

COPY src /app/src
COPY pom.xml /app
COPY lib/InterfaceRMI-1.5-SNAPSHOT.jar /app/lib/InterfaceRMI-1.5-SNAPSHOT.jar
COPY lib/OrderServer-1.0-SNAPSHOT.jar /app/lib/OrderServer-1.0-SNAPSHOT.jar

WORKDIR /app
RUN mvn install:install-file -Dfile=/app/lib/InterfaceRMI-1.5-SNAPSHOT.jar -DgroupId=org.example -DartifactId=InterfaceRMI -Dversion=1.5-SNAPSHOT -Dpackaging=jar
RUN mvn install:install-file -Dfile=/app/lib/OrderServer-1.0-SNAPSHOT.jar -DgroupId=org.example -DartifactId=OrderServer -Dversion=1.0-SNAPSHOT

RUN mvn clean install

FROM eclipse-temurin:19-jre-alpine

COPY --from=build /app/target/OrderServer-1.0-SNAPSHOT.jar /app/app.jar

WORKDIR /app

EXPOSE 1099

CMD ["java", "-jar", "app.jar"]