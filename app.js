const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');



// settings
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//midleware
app.use(morgan('dev')); 
app.use(express.urlencoded({extended: false}));


//routes

app.use(require('./routers/index'));

//static

app.use(express.static(path.join(__dirname, 'public')));


//404 handler
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
})



module.exports = app;
