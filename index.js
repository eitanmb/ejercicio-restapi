require('dotenv').config();
const express = require('express');
const { createCurrenciesRatesFile } = require('./helpers/currency-operations');

//Obtener tipos de cambio y crear archivo json
createCurrenciesRatesFile();

const app = express();
const port = process.env.PORT;

//Acceso a carpeta publica
app.use( express.static('public') );

//Lectura y parse de objetos JSON
app.use( express.json() );

//Rutas
app.use( '/beers', require('./routes/beers.routes') );


app.listen( port, () => {
    console.log(`Conectado al puerto ${ port }`);
});
