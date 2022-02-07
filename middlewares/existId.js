const { obtenerDataPorId } = require("../helpers/db-operations");

const existId = ( beerID ) => {

    const existId = obtenerDataPorId( beerID );

    if( !existId ) {
        throw new Error(`No existe el Id`);
    }

    return true;
}

module.exports= existId;