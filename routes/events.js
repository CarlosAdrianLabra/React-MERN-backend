const { Router } = require('express')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router()
//Todas tienen que pasar por la validacion del JWT
router.use(validarJWT)
// Obtener eventos
router.get('/getEventos',getEventos)

// Crear un nuevo evento
router.post('/crearEvento',[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de fin es obligatoria').custom(isDate),
    validarCampos

], crearEvento)

// Actualizar evento
router.put('/actualizarEvento/:id', actualizarEvento)

// Actualizar evento
router.delete('/eliminarEvento/:id', eliminarEvento)

module.exports = router