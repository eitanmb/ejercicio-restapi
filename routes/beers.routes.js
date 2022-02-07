const { Router } = require('express');
const { check } = require('express-validator');
const { detalleMarca, precioCaja, agregarCerveza, listadoCervezas } = require('../controllers/beers.controller');
const existId = require('../middlewares/existId');
const validarCampos = require('../middlewares/validarCampos');

const router = Router();

//Lista el detalle de la marca
router.get( 
    '/:beerID',
    [ 
        check('beerID').custom(existId),
        validarCampos
    ],
    detalleMarca );

//Lista el precio de la caja
router.get( 
    '/:beerID/boxprice', 
    [ 
        check('beerID').custom(existId),
        validarCampos
    ],
    precioCaja );

//Lista todas las cervezas
router.get( 
    '/',
    listadoCervezas );

//Agrega una cerveza
router.post( '/', agregarCerveza );


module.exports = router;
