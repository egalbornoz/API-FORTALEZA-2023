/**********************************************************************************
 *     IMPORTACIONES NECESARIAS
 **********************************************************************************/
const { Router } = require('express');
const { clientesGet } = require('../controllers/clientes');

const router =  Router();

/*********************************************************************************
 *    DEFINICION DE END-POINT O RUTAS CLIENTES
 *********************************************************************************/
router.get('/',
clientesGet);

module.exports = router;