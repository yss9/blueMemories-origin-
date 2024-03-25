# BlueMemories Start

* `docker-compose up --build` //제일 처음 실행할 때 또는 docker관련 파일 수정했을 때
* `docker-compose up` //그 외 실행
<br><br>

## spring 컨테이너 db 확인

* 새로운 터미널 창 open
* `docker ps` //실행중인 컨테이너 확인
* `docker exec -it <컨테이너 아이디> sh` //shell로 실행
* mysql> `mysql -u root -p` //mysql 접속
* mysql> password: `****` //비밀번호 입력
* mysql> `show databases;` //생략가능
* mysql> `use <database이름>;` //database 접속

--이후로는 원하는 sql문 작성---
* mysql> `show table;`
* mysql> `select * from <table>;`
* ...

