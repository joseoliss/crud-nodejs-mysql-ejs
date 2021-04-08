const express = require('express');
const path = require('path');//se encarga de unir directorios
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();

//importing routes
const routes = require('./routes/customer');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'newUser',
    password: 'joseoliss@123',
    database: 'crudnodejsmysql'
}, 'single'));
app.use(express.urlencoded({ extended: false }));   //permite entender todos los datos que viene del formulario
//extended: false porque no envia imagenes ni datos codificados

//routes
app.use('/', routes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log(app.get('port'));
});