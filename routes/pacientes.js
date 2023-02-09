/********************************************************************************
 * Importaciones necesarias
 ********************************************************************************/
const { Router } = require('express');
const { check } = require('express-validator');
const { pacientesGet,pacientesPost, pacientesDelete, pacientesPut } = require('../controllers/pacientes');
const { existePacientePorDni, existePacientePorId, existePaciente } = require('../helpers');
const { validarCampos, esAdminRole, tieneRole, validarJWT } = require('../middlewares');
const router = Router();

/********************************************************************************
 * Rutas obtener pacientes - endPoint
 ********************************************************************************/
router.get('/',
validarJWT,
 pacientesGet);

// /********************************************************************************
//  * Ruta para actualizar  paciente por Id - endPoint
//  ********************************************************************************/
router.put('/', [
    validarJWT,
    //check('id', 'No es un ID válido').isMongoId(),
    check('dni').custom(existePaciente),
    //check('rol').custom(isRolValid),
    validarCampos,
], pacientesPut);
// /********************************************************************************
//  * Ruta para crear  paciente  - endPoint
//  ********************************************************************************/
router.post('/', [
    validarJWT,
    check('dni').custom(existePacientePorDni),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('edad', 'La edad es obligatoria').not().isEmpty(),
    check('fecha', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    validarCampos
], pacientesPost);

// /********************************************************************************
//  * Ruta para eliminar paciente - endPoint
//  ********************************************************************************/
router.delete('/:dni', [
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('dni').custom(existePaciente),
    validarCampos
], pacientesDelete
);
/********************************************************************************
 * Exportacion de las rutas pacientes - endPoint
 ********************************************************************************/
module.exports = router;