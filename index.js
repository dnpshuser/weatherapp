if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const expressEjsLayouts = require('express-ejs-layouts');


app.use(bodyParser.urlencoded({extended : true}));
app.use(expressEjsLayouts);
app.use(express.static('public'));
app.set("view engine",'ejs');
app.set("views","./views");

app.get('/',(req,res) => {
    res.render('index');
})

app.post("/",(req,res) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${process.env.key}`)
    .then( (response) => {
        return response.json();
    })
    .then( (data) => {
        if(data.cod == 404) {
            res.render('nocity');
            return ;
        }
        res.render('solution', {data : data});
    })
    .catch( (error) => {
        res.render('nocity');
    })
})

app.listen(port,() => console.log(`listening to the port ${port}`));