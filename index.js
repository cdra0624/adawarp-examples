'use strict';
const path = require('path');
const PORT = 3377;

const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/docs/index.html'));
});
app.use("/", express.static(path.join(__dirname, 'docs')));
//app.use("/docs", express.static(path.join(__dirname, 'docs')));
/*app.use("/01-1.videoChat", express.static(path.join(__dirname, 'docs/01-1.videoChat')));
app.use("/01-2.helloSender", express.static(path.join(__dirname, 'docs/01-2.helloSender')));
app.use("/01-3.helloReceiver", express.static(path.join(__dirname, 'docs/01-3.helloReceiver')));*/

app.use("/assets", express.static(path.join(__dirname, 'docs/assets')));

app.listen(PORT);
console.log('listening on port ' + PORT);