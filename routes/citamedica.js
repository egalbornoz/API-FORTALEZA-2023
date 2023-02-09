/********************************************************************************
 * Importaciones necesarias
 ********************************************************************************/
const { Router } = require('express');
const { check } = require('express-validator');
const { existeProductoPorId, existeCategoriaPorId, existePacientePorId } = require('../helpers/db-validators');
const { validarJWT,
    validarCampos,
    esAdminRole } = require('../middlewares');

const { crearCitaMedica,   
    obtenerCitasMedicas,
    obtenerCitaMedica} = require('../controllers/citamedicas');
const router = Router();
/********************************************************************************
 *Ruta Obtener todas los citamedica - publico  endPoint
 ********************************************************************************/
router.get('/', validarJWT,obtenerCitasMedicas);

/********************************************************************************
 *Ruta Obtener una citamedica por id - publico endPoint
 ********************************************************************************/
router.get('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existePacientePorId),
    validarCampos,
    obtenerCitaMedica,
]);
/********************************************************************************
 *Ruta Crear citamedica - privado - cualquier persona con token válido - endPoint
 ********************************************************************************/
router.post('/', [
    validarJWT,
     check('paciente', 'No es un  id Mongo ').isMongoId(),
     check('paciente').custom(existePacientePorId),
     validarCampos,
], crearCitaMedica,
);
/********************************************************************************
 *Ruta  Actualizar citamedica - privado - cualquier persona con token válido - endPoint
*********************************************************************************/
// router.put('/:id', [
//     validarJWT,
//     // check('categoria', 'No es un ID válido').isMongoId(),
//     check('id').custom(existeProductoPorId),
//     validarCampos,
// ], actualizarProducto);
/********************************************************************************
 *Ruta  Eliminar citamedica Solo administrador  - endPoint
*********************************************************************************/
// router.delete('/:id', [
//     validarJWT,
//     esAdminRole,
//     check('id', 'No es un ID válido').isMongoId(),
//     check('id').custom(existeProductoPorId),
//     validarCampos
// ], borrarProducto);
/********************************************************************************
 *  Exportación Rutas 
*********************************************************************************/
module.exports = router;