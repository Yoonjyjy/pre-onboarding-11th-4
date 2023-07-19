# 원티드 프론트엔드 인턴십 - 개인과제

4주차 과제 프로젝트

## 프로젝트 소개

[특정 API 레포지토리(assignment-api)](https://github.com/walking-sunset/assignment-api)의 API를 참고 및 활용하여 검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현하기

## 프로젝트 기간

7월 19일(수)

## 실행방법

```
[검색용 서버]
assignment-api 레포지토리 clone 후

$ npm install
$ npm start

[프로젝트 실행]

$ npm install
$ npm start
```

## 프로젝트 링크

```
[! 검색용 서버 실행 필요]
assignment-api 레포지토리 clone 후

$ npm install
$ npm start
```

[배포 프로젝트 바로가기](https://main--strong-marshmallow-d75e1c.netlify.app/)


## 전체 구동 화면 미리보기

![실행화면](https://github.com/Yoonjyjy/pre-onboarding-11th-4/assets/41252790/de023797-a484-4bb6-9ecb-ba3bd9727e9b)

## 개발환경

- 언어 : typescript
- 라이브러리 및 프레임워크: react, axios, styled-components 등
- 배포 : netlify

---

## 구현 목표
- 아래 사이트의 검색영역을 클론하기
    
[한국임상정보](https://clinicaltrialskorea.com/)


### 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

- 검색어가 없을 시 “검색어 없음” 표출

### API 호출별로 로컬 캐싱 구현

- 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
- 캐싱을 어떻게 기술했는지에 대한 내용 README에 기술
  - 검색창에 입력 시 캐싱 되어있는지 확인하고 만료 시간이 초과되지 않았다면 추천 검색어에 캐싱된 데이터 노출
  - 그렇지 않다면 api 호출
- expire time을 구현할 경우 가산점
  - 구현 완료 

### 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

- README에 전략에 대한 설명 기술
  - 입력마다 API를 호출하게 된다면 불필요한 검색 결과까지 호출되므로(ex: 담낭의 경우 ㄷ, 다, 담, 담ㄴ, 담나, 담낭처럼 호출) 호출 횟수를 줄이기 위하여 Throttle을 적용시키기로 함
  - 그러나 lodash 라이브러리가 존재하나 라이브러리가 과제에서 제한되어 있으므로 직접 구현하여 적용
  - 따라서 모든 검색 결과가 api 호출되지는 않고 시간차를 두고 검색하도록 함
 
  
 
  ```
        const callApiForSuggestionsThrottled = (keyword: string) => {
        if (throttleTimeoutRef.current) {
            clearTimeout(throttleTimeoutRef.current);
        }

        throttleTimeoutRef.current = setTimeout(() => {
            callApiForSuggestions(keyword);
        }, 300);
    };
  ```

### API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

![image](https://github.com/Yoonjyjy/pre-onboarding-11th-4/assets/41252790/be0a3c44-79fe-4769-a34e-4a661113035f)

- console.info("calling api")과 함께 현재 api 호출한 단어도 표시하도록 함

### 키보드만으로 추천 검색어들로 이동 가능하도록 구현

- 사용법은 위, 아래 방향키로 이동 후 Enter 버튼을 누르면 해당 추천 검색어로 검색창에 입력됨
- 현재 선택된 추천 검색어는 배경색 변경되어 확인 가능
- 해당 기능은 클릭 시에도 동일 적용

