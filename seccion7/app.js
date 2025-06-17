
const express = require('express');
const app = express()
const port = 3000;

app.set('view engine', 'hbs');

//middleware
app.use(express.static('public'));

app.get('/',(req,res)=>{
    //res.sendFile(__dirname + '/public/index.html');
    res.render('home',{
        nombre: 'Leivy Anel',
        titulo: 'Curso de Node.js'
    });
});

app.get('/elements',(req,res)=>{
    res.sendFile(__dirname + '/public/elements.html');
});

app.get('/generic',(req,res)=>{
    res.sendFile(__dirname + '/public/generic.html');
});

app.get('*',(req,res)=>{
    res.send('404| Not Found');
});

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});

