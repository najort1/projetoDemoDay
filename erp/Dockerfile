# first stage: use a maven project to clean package the application
FROM maven:3.9-eclipse-temurin-21 AS MAVEN_BUILD

# Definindo as variáveis de ambiente
ARG DATABASE_URL
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ARG BUCKET_URL
ENV DATABASE_URL=$DATABASE_URL
ENV DATABASE_USERNAME=$DATABASE_USERNAME
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD
ENV BACKET_URL=$BACKET_URL

WORKDIR /home/myapp

# Copying the project files
COPY . .

# Running initialize and install/go-offline commands
RUN mvn initialize \
 && mvn dependency:go-offline \
 && mvn clean package

# second stage: use open jdk 11.0.11 image to build the project docker image
#FROM adoptopenjdk/openjdk11:jre-11.0.11_9-alpine
FROM eclipse-temurin:21-jre-alpine

# Create directory to copy jar file
RUN mkdir -p /usr/local/lib/

# copy jar needed from the first stage and discard the rest
COPY --from=MAVEN_BUILD /home/myapp/target/erp.jar /usr/local/lib/erp.jar

EXPOSE 8080

# set the startup command to execute the jar
CMD java -jar /usr/local/lib/erp.jar
