#FROM openjdk:17-jdk-slim
#WORKDIR /app
#COPY target/*.jar odm.jar
#EXPOSE 8080
#ENTRYPOINT ["java", "-jar", "odm.jar"]

# build
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# run
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
CMD ["java", "-jar", "app.jar"]