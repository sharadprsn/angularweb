var express = require('express'), 
	http = require('http'),
	routes = require("./server/routes")
	path = require('path');
//var patch = require('./server/enableMultiViewPath');


var app = express();

app.set('port', 3000);
app.engine('html', require('ejs').renderFile);
//patch.multiViewPath();
//app.set('views', [__dirname + "/public/views", __dirname + "/public/js/app/templates"]);
app.set('views', __dirname + "/public/views");
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/index*', routes.index);

http.createServer(app).listen(app.get('port'),function(){
	console.log('server listening on port '+ app.get('port'));
});
