const { Router } = require('express');
const { check } = require('express-validator');
const { Ver_servicios, Crear_servicios, Actualizar_servicios, Borrar_servicios } = require('../controller/servicios');

const router = Router();

router.get('/:id', Ver_servicios);

router.post('/:id', [
        check('nombre_servicio', 'Este campo es obligatorio').not().isEmpty(),
        check('numero_cuenta_usuario', 'Este campo es obligatorio').not().isEmpty(),
        check('monto', 'Este campo es obligatorio').not().isEmpty()
    ], 
    Crear_servicios
);

router.put('/:id',
    [
        check('numero_cuenta_usuario', 'Este campo es obligatorio').not().isEmpty(),
        check('monto', 'Este campo es obligatorio').not().isEmpty()
    ],
    Actualizar_servicios
);

router.delete('/:id',
Borrar_servicios
);

module.exports = router;