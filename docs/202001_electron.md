# Electron

## 구성

### Main 프로세스

Entry Point. 웹 페이지가 생성되면서 화면이 만들어짐

### Renderer 프로세스

Main 프로세스로부터 생성된 웹 페이지가 동작하는 프로세스.
화면 출력에는 Chromium 이 사용됨. 각 페이지는 각각의 프로세스가 관리.
일반 웹앱의 웹페이지는 PC 네이티브 리소스에 접근 불가능하나,
Node.js API를 통해 접근 가능하다.
=> XSS 코드를 주의해야 함

## basic

https://electronjs.org/docs/tutorial/first-app#installing-electron

### BrowserWindow

Renderer 프로세스를 만들어 웹 페이지를 출력.
인스턴스 1개 = 웹 페이지 1개.

### app / 생명주기

app 인스턴스를 기반으로 앱 전체의 생명주기를 관리.

- ready : 실행, 초기화 완료 시
- window-all-closed : 모든 윈도우가 닫혔을 때
- activate : 비활성화 > 활성화로 전환 시 (macOS 전용 생명주기)
  - window-all-closed 시 macOS 는 여전히 살아있기 때문에 사용함.

### code

```
const { app, BrowserWindow } = require('electron');

let win;
function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL(`file://${__dirname}/index.html`);
  win.webContents.openDevTools(); //개발자도구 open
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

```

## React + Typescript

https://www.sitepen.com/blog/getting-started-with-electron-typescript-react-and-webpack/
