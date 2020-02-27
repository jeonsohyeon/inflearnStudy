var express = require('express');
var router = express.Router();

router.post('/login', (req, res, next) => {
  //메소드 post, id, password 키로 값을 보낸다.
  //id === 이름, password === 이름 + 123;
  const { id, password } = req.body;
  if (id !== 'jsh') {
    const error = new Error('user not found');
    error.status = 400;
    return error;
  } else if (password !== 'jsh123') {
    const error = new Error('pw not found');
    error.status = 400;
    return error;
  }
  next();
});

router.post('/login', (req, res, next) => {
  res.json({ message: 'success' });
});

router.post('/', (req, res, next) => {
  /* USER 생성 요청 
    body: ID, PW 
    content-type: x-www-urlencoded, application/json
  */
  /* DB 모델을 가지고 실제 유저 생성 필요 */
  const { id, password } = req.body;
  const User = {
    id: id,
    password: password
  };
  req.CreatedUser = User;
  next();
});
router.post('/', (req, res, next) => {
  req.json(req.CreatedUser);
});
module.exports = router;
