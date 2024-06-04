const { Router } = require('express');
const { check } = require('express-validator');

const { Ver_transacciones, Crear_transacciones, Actualizar_transacciones, Borrar_transacciones } = require('../controller/transacciones');

const router = Router();

router.get('/:id', Ver_transacciones);

router.post('/:id', [
        check('numero_cuenta_recibe', 'Este campo es obligatorio').not().isEmpty(),
        check('numero_transaccion', 'Este campo es obligatorio').not().isEmpty(),
        check('monto', 'Este campo es obligatorio').not().isEmpty(),
        check('descripcion', 'Este campo es obligatorio').not().isEmpty(),
    ], 
    Crear_transacciones
);

router.put('/:id',
    [
        check('numero_transaccion', 'Este campo es obligatorio').not().isEmpty(),
        check('monto', 'Este campo es obligatorio').not().isEmpty(),
        check('descripcion', 'Este campo es obligatorio').not().isEmpty(),
    ],
    Actualizar_transacciones
);

router.delete('/:id',
Borrar_transacciones
);

module.exports = router;