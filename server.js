
var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require("pusher");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join("index.html"))
  app.set('view engine', 'index.html')
  app.get('/', (req, res) => res.render('pages/index'))
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))



app.get("/pusher/auth", function(req, res) {
  var query = req.query;
  var socketId = query.socket_id;
  var channel = query.channel_name;
  var callback = query.callback;

  var presenceData = {
    user_id: '{id}' ,
    user_info: {
      name: "{id} "
    }
  };

  var auth = JSON.stringify(pusher.authenticate(socketId, channel, presenceData));
  var cb = callback.replace(/\"/g,"") + "(" + auth + ");";

  res.set({
    "Content-Type": "application/javascript"
  });

  res.send(cb);
});
