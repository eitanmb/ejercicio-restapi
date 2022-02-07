const fs = require('fs');

const archivo = './db/cervezas.json';


const agregarData = ( data ) => {

    console.log(data.Id);
    //verificar que la cerveza no existe en la db
    // const existId = db.filter( item => item.Id === data.Id );
    const existeCerveza = obtenerDataPorId( data.Id );
  
    if(existeCerveza) {
        return false;
    }

    //Agregar cerveza a la db
    const db = leerDB();
    db.push(data);
    fs.writeFileSync( archivo, JSON.stringify(db));
    
    return true;
    
}

const leerDB = () => {

    if( !fs.existsSync( archivo ) ) {
      return null;
    }
  
    const db = JSON.parse(fs.readFileSync( archivo,{ encoding:'utf-8' } ));
  
    return db;
  
}

const obtenerDataPorId = ( id ) => {

    const db = leerDB();
    
    //devuelve la data de la cerveza segun el id
    const data = db.filter( item => item.Id === parseInt(id) );

    return data[0];
}


module.exports = {
    agregarData,
    leerDB,
    obtenerDataPorId,
}