FROM gradle:jdk17

WORKDIR /usr/src/spring
COPY . /usr/src/spring
VOLUME /tmp

RUN chmod +x run.sh && gradle updateLib

EXPOSE 8080

CMD [ "sh" , "run.sh" ]