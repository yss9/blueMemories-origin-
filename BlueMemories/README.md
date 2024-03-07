[실행]
>docker-compose up

[dockerfile 수정 후 재실행]
>docker-compose up --build

[error backend- ADD /build/libs/* /app.jar ]
1) build/libs/snapshot.jar 파일이 있는지 확인한다.
2) 없으면 터미널 창에 './gradlew build' 입력
3) build/libs/snapshot.jar 파일이 생성되었다면 다시 docker-compose up --build
4) 작동된다.
(**.jar 파일은 용량이 커서 gitignore에 있기때문에 해당 파일을 처음 열면 없는게 맞다.**)

[mysql 사용]
docker ps
docker exec -it <컨테이너아이디> bash
mysql -u root -p
1234
show databases;
use BlueMemories
select database();
show tables;


----CSS 참고---
[styled component 사용법]
https://sunho-doing.tistory.com/entry/Reactjs-Styled-Component

[이미지 드래그 앤 드롭]
https://inpa.tistory.com/entry/%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD-Drag-Drop-%EA%B8%B0%EB%8A%A5

[box-shadow]
https://www.cssmatic.com/box-shadow

[typescript->javascript로 변환]
tsc 파일이름

[background-image]
https://developer.mozilla.org/ko/docs/Web/CSS/background-image

[css flex 옵션]
https://www.heropy.dev/p/Ha29GI

[상하좌우 정렬]
https://so4869.tistory.com/23

[부모자식 위치 자유롭게 지정 relative-absolute]
https://bebeya.tistory.com/entry/css-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EA%B2%B9%EC%B9%98%EA%B8%B0-2%EA%B0%9C-3%EA%B0%9C-position-absolute-relative

