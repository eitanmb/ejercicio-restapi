const { response } = require("express");
const { boxPrice, getExchangeUSDotherCoin, getExchangeOtherCoinUSD, priceToUSD } = require("../helpers/currency-operations");
const { agregarData, leerDB, obtenerDataPorId } = require("../helpers/db-operations");

const detalleMarca = ( req, res=response ) => {

    const { beerID } = req.params;

    const data = obtenerDataPorId( beerID );

    res.json({
        msg: 'Lista el detalle de la marca',
        beerID,
        data
    });
}


const precioCaja = ( req, res=response ) => {

    const { beerID } = req.params;
    const { currency:paidCurrency, quantity } = req.query;

    //determinar precio de la cerveza buscada y moneda en que está expresado
    const { Currency:beerCurrency, Price } = obtenerDataPorId( beerID );

    //Obtener tipos de cambio
    let usdPrice,
    precioCaja,
    exRateUSDotherCoin,
    exRateOtherCoinUSD;

    if ( paidCurrency != beerCurrency ) {  

        if( beerCurrency === "USD" ) {
            
            //Obtener el tipo de cambio de la moneda de pago respecto al dolar 
            exRateUSDotherCoin = getExchangeUSDotherCoin( paidCurrency );

            //Calcular el precio de la caja en la moneda de pago
            precioCaja = boxPrice(Price, quantity, exRateUSDotherCoin);
           
        
        } else {

            //Convertir moneda de la cerveza a USD
            exRateOtherCoinUSD = getExchangeOtherCoinUSD( beerCurrency );

            //Convertir el precio de la cerveza a USD
            usdPrice = priceToUSD( exRateOtherCoinUSD, Price );

            //Obtener el tipo de cambio de la moneda de pago respecto al dolar 
            exRateUSDotherCoin = getExchangeUSDotherCoin( paidCurrency );

            //Calcular el precio de la caja en la moneda de pago
            precioCaja = boxPrice( usdPrice, quantity, exRateUSDotherCoin);
        }
   
    } else {
        precioCaja = boxPrice(Price, quantity, 1);
    }


    res.status(200).json({
        "msg": "Precio de la caja",
        "Total Price": `${ paidCurrency } ${ precioCaja.toFixed(2) }`
        
    });
}


const listadoCervezas = ( req, res ) => {

    res.status(200).json(leerDB());
}


const agregarCerveza = ( req, res=response ) => {

    const { Id, Name, Brewery, Country, Price, Currency } = req.body;

    const data = {
        Id,
        Name,
        Brewery,
        Country,
        Price,
        Currency
    };
    
    const agregarCerveza = agregarData( data );
    
    if (!agregarCerveza) {
        return res.status(409).json({
            msg: 'Agregar cerveza',
            error: `El Id de la cerveza ya existe`
        })
       
    }

    res.status(201).json({
        msg: 'Agregar cerveza',
        cerveza: data,
    });


}


module.exports ={
    detalleMarca,
    precioCaja,
    listadoCervezas,
    agregarCerveza
};