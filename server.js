const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use((req, res, next) => {
    var now = new Date().toString();

    var log= (`${now}: ${req.method} ${req.url}`);
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

// app.use((req,res,next) => {
//     res.render('maintaince.hbs');  // if you are update the page 
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

app.get('/',(req, res) => {
    // res.send('<h1>hello express!</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home page',
        welcomeMessage: 'welcome to my website',
    })
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle: 'about page',
    });
});

app.get('/bad', ( req, res) => {
    res.send({
        errormass:'unabke to reach '
    });
})
app.listen(3000, () => {
    console.log('server is live on port 3000');
});