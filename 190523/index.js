const express = require('express');
const fs = require('fs');
const _ = require('underscore');

const app = express();
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
	res.send('hello world');
})
app.listen(port, () => console.log(`http://localhost:${3000}`));


// import blog from './main.js';

// const myblog = new blog();