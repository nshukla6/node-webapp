const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+"/public"));
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log=`${now} : ${req.method} ${req.url}`;

    fs.appendFile('server.log',log+'\n', (err)=>{
        if(!err){
            console.log(log);
        }
        else {
            console.log("Error while writing to log file");
        }
    });
    
    next();
});

hbs.registerHelper('capitalize',(text1)=>{
    return text1.toUpperCase();
})
app.set("port",3000);
app.get('/', (req, res)=>{
    // res.send("<h1>hello world<h1>");
    // res.json({
    //     name:"nitin"
    // });
    res.render('home', {
        pageTitle: 'Home Page'
    });
});

app.get('/about',(req, res)=>{
    // res.send('About Page');
    res.render('about', {
        pageTitle: 'About Page'
    });

});

app.listen(app.get("port"),()=>{
    console.log(`server is listening at port ${app.get("port")}`);
});