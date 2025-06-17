
const express = require('express');
const hbs = require('hbs');
require('dotenv').config();
const app = express()
const port = process.env.PORT;

//Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', (err) => {

    });

//middleware
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('home',{
        nombre: 'Leivy Anel',
        titulo: 'Curso de Node.js'
    });
});

app.get('/elements',(req,res)=>{
   res.render('elements',{
       nombre: 'Leivy Anel',
       titulo: 'Curso de Node.js'
   });
});

app.get('/generic',(req,res)=>{
   res.render('generic',{
        nombre: 'Leivy Anel',
        titulo: 'Curso de Node.js'
    });
});


app.get('*',(req,res)=>{
    res.send('404| Not Found');
});

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});

