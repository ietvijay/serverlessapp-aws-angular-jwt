var express = require('express');
var morgan = require('morgan');
var app= express();


app.use(morgan('dev'));

//public directories
app.use('/app-content',express.static('app-content'));
app.use('/app-helpers',express.static('app-helpers'));
app.use('/app-services',express.static('app-services'));
app.use('/app-nav',express.static('app-nav'));
app.use('/home',express.static('home'));
app.use('/login',express.static('login'));
app.use('/shared',express.static('shared'));
app.use('/new-release',express.static('new-release'));
app.use('/upload',express.static('upload'));

app.get('/index.html',function(req,res){
    res.sendfile('index.html');
});
app.get('/',function(req,res){
    res.sendfile('index.html');
});
app.get('/_env.js',function(req,res){
    res.sendfile('_env.js');
});
app.get('/app.js',function(req,res){
    res.sendfile('app.js');
});
app.get('/style.css',function(req,res){
    res.sendfile('style.css');
});
app.listen(8080);
console.log('App listening to port 8080');