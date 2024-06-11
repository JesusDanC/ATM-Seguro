const { Router } = require('express');
const { check } = require('express-validator');

const { Ver_bitacora, Crear_bitacora, Actualizar_bitacora, Borrar_bitacora } = require('../controller/bitacora');

const router = Router();

router.get('/:id', Ver_bitacora);

router.post('/:id', [

    ], 
    Crear_bitacora
);

router.put('/:id',
    [
        check('fecha_salida', 'Este campo es obligatorio').not().isEmpty()
    ],
    Actualizar_bitacora
);

router.delete('/:id',
Borrar_bitacora
);

module.exports = router;