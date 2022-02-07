const { default: axios } = require("axios");
const { Console } = require("console");
const fs = require('fs');

const archivo = './db/currencies.json';

const createCurrenciesRatesFile = async() => {

  const apiBaseUrl = `${ process.env.CURRENCY_BASEURL }/${ process.env.CURRENCY_SERVICE }?access_key=${ process.env.CURRENCY_KEY }`;

  const { data } = await axios.get( apiBaseUrl );
  const { quotes } = data;
  const info = JSON.stringify(quotes);

  try {
    fs.writeFileSync( archivo, info );
    console.log('writing currency file');

  } catch (error) {
    console.log(error);
  }
  
  
}

const getExchangeUSDotherCoin = ( currency='EUR' ) => {
  
   try {

    const quotes = JSON.parse(fs.readFileSync( archivo,{ encoding:'utf-8' } ));

    for ( const quote in quotes ) {
        if( quote.slice(3) === currency ) {
            return ((quotes[quote]));
        }
    }

  } catch (err) {
      throw err
  }

}

const getExchangeOtherCoinUSD = ( currency='EUR' ) => {
  
  try {

   return ( 1 / getExchangeUSDotherCoin(currency));

 } catch (err) {
     throw err
 }

}

const priceToUSD = ( exchangeRate, price ) => {
  
  try {

    const priceToUSD = price * exchangeRate;

    return priceToUSD;
    
  } catch (error) {
    
      throw new Error(error);
  }

}

const boxPrice = ( precio, quantity, exRate ) => {

  const boxPrice = precio * quantity * exRate ;
  return boxPrice;
}

   

module.exports = {
  boxPrice,
  createCurrenciesRatesFile,
  getExchangeUSDotherCoin,
  getExchangeOtherCoinUSD,
  priceToUSD
};