const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



const bodyParser = require('body-parser');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



server.listen(3000, () => {
  console.log('listening on *:3000');
});


const fs = require('fs');

const toTimestamp = (strDate) => {
  const dt = new Date(strDate).getTime();
  return dt;
}

const removeLines = (data, lines = []) => {
    return data
        .split('\n')
        .filter((val, idx) => lines.indexOf(idx) === -1)
        .join('\n');
}

var namespace = io.of('/labelNamespace');
namespace.on('connection', function(socket) {
	fs.readFile('list.txt', 'utf8', function (err,filedata) {
			  if (err) {
				return console.log(err);
			  }
			  
			  namespace.emit('list', filedata);
			});
});


