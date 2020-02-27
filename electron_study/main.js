const electron = require('electron');
const { app, BrowserWindow } = electron;
const url = require('url');
const path = require('path');
const handler_manager = require('./handler_manager');
const io = require('socket.io-client');
const axios = require('axios');
const socketURL = 'ws://127.0.0.1:3000';
const socketOptions = {
  transports: ['websocket'],
  forceNew: true,
  query: {
    token: 'jsh123'
  }
};
const SocketService = require('./service/SocketService');
let win, socket;

app.on('ready', () => {
  const options = {
    width: 800,
    height: 600,
    resizable: false,
    show: false,
    webPreferences: {
      affinity: true,
      nodeIntegration: true
    }
  };
  win = new BrowserWindow(options);
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    })
  );
  win.webContents.openDevTools();
  win.once('ready-to-show', () => {
    //모든 웹 컨텐츠 연결 이후에 소켓 연결
    console.log('ready to show');
    socket = SocketService.createSocket(io, socketURL, socketOptions);
    SocketService.addHandlers(socket, win, handler_manager);
    win.show();
  });
  win.on('closed', () => {
    win = null;
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
app.on('activate', () => {
  app.quit();
});
