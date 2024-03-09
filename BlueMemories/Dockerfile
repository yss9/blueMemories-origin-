FROM openjdk:17

WORKDIR /app

EXPOSE 8080

ADD /build/libs/* /app.jar

COPY ./src .

ENTRYPOINT ["java", "-jar", "/app.jar"]