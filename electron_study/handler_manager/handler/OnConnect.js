'use strict';

module.exports = (socket, win) => {
  console.log(`socket connected. ${socket.id}`);
  socket.emit(SocketEvent.HELLO, { message: 'hello server' }); //이벤트
  win.webContents.send(SocketEvent.HELLO, { message: 'render hello' }); //렌더
};
