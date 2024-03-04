
['yarn start' 입력했을 때 Cannot find module 'react' 에러]
>npm i react react-dom


[처음 파일 받았을 때 기본으로 설치해야하는 라이브러리]
1. helmet(웹 문서 header 부분 쉽게 변경해주는 라이브러리)
>npm install --save react-helmet
import {Helmet} from "react-helmet"; 로 사용 가능
2. styled-components설치
>npm i styled-components
3. 폰트 스타일 초기화 및 호환성을 위한 styled-reset 설치
>yarn add styled-reset


[window에서 yarn사용법]
PowerShell
>Get-ExecutionPolicy
결과가 Restricted라면 
>Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
한뒤 다시
>Get-ExecutionPolicy
결과가 RemoteSigned라면 사용 가능

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

