const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname +'/public'));

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('./server.log',log + '\n', (err) =>{
        if(err) {
        console.log('Unable to append log to file');
        }
    });
    next();
});

app.use((req,res,next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance Page',
        currentYear: new Date().getFullYear(),
    })
})


app.get('/',(req,res) => {
    res.render('welcome.hbs',{
        pageTitle: 'Welcome Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my webpage'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});


app.listen(3000, () =>{
    console.log('Sever is up on port 3000');
});