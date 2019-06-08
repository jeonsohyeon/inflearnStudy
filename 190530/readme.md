정리
---
http:(프로토콜)//호스트(도메인):포트/패스?쿼리 스트링

웹서버 : 기본값 80
쿼리 스트링으로 데이터 값을 전달해 줄 수 있다.

[CRUD]
Create Read Update Delete

process.argv (배열 형태로 반환)
노드가 있는 위치
현재 파일 위치
프로그래밍에서 부여한 값(opt) 

[오류] Client does not support authentication protocol requested by server; consider upgrading MySQL client

- mysql 연동 시 유저 로그인이 제대로 안되는 이슈.

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '비밀번호';
```
