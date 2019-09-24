# Feature

- 하루 이전 날짜 기준으로 데일리 박스오피스 1~10위 까지 노출
- 영화 제목 클릭 시, 감독 및 배우 상세 정보 제공
- 감독/배우 링크를 클릭시, 해당 이름을 키워드로 하는 유투브 5건 노출

## Tool

- Express.js + node-sass-middleware
- 영화진흥위원회 Api
- Youtube 검색 Api

## Code Detail

### 비동기 통신 : fetchURL(url, callback)

- GET 방식으로 호출한다.
- ajax 대신 fetch 를 사용했고, 매개변수로 url 과 callback 을 받을 수 있는 함수를 만들어 재사용이 가능하게 함

### 영화 Api 호출 : findRank

- fetchURL로 호출된 데이터를 받아서 렌더링한다.
- 영화 상세정보를 출력하기 위한 파라미터를 제목에 데이터 속성으로 추가한다. (moviecd)
- 만약 신규진입일 경우 신규진입이라는 글자를 추가 노출한다.

### 영화 상세정보 Api 호출 : findInfo

- 영화 제목 클릭 시 제목에 있는 데이터 속성(moviecd)을 기준으로 감독, 배우 정보를 불러온다.
- 감독, 배우는 배열로 받아오므로 for 문으로 데이터를 재가공한다.

### 유투브 검색 Api 호출 : searchYoutube, findYoutube

- searchYoutube : 검색 키워드를 받아, 지정된 형식에 맞추어 요청 url을 생성해서 fetchURL의 첫번째 매개변수로 보내고, 콜백으로 findYoutube를 호출한다.
- findYoutube : 검색결과를 받아 렌더링한다.
