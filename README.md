# NotionLike

간단한 노트와 할 일을 관리하는 예제 애플리케이션입니다.

## 폴더 구조

- `backend` : Express 기반 API 서버
- `frontend` : 브라우저에서 동작하는 간단한 클라이언트

## 백엔드 실행 방법

```bash
cd backend
npm install
node index.js
```

## 프론트엔드 실행 방법

```bash
cd frontend
# VSCode 의 Live Server 확장이나 `npx serve` 명령을 이용하여 index.html 을 열어주세요.
```

로그인 후 노트와 할 일을 사용자별로 저장할 수 있습니다.

### 채팅 기능

`/chat` 엔드포인트에 질문을 보내면 현재 로그인한 사용자의 노트와 할 일에서
관련된 내용을 찾아 응답합니다. 프론트엔드의 채팅창에서 질문을 입력하면
결과를 확인할 수 있습니다.
