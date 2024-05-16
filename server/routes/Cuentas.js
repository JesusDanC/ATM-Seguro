const { Router } = require('express');
const { check } = require('express-validator');

const { Ver_cuentas, Crear_cuentas, Actualizar_cuentas, Borrar_cuentas } = require('../controller/cuentas');

const router = Router();

router.get('/:id', Ver_cuentas);

router.post('/:id', [
        check('numero_cuenta', 'Este campo es obligatorio').not().isEmpty(),
        check('nombre', 'Este campo es obligatorio').not().isEmpty()
    ], 
    Crear_cuentas
);

router.put('/:id',
    [
        check('numero_cuenta', 'Este campo es obligatorio').not().isEmpty(),
        check('nombre', 'Este campo es obligatorio').not().isEmpty()
    ],
    Actualizar_cuentas
);

router.delete('/:id',
Borrar_cuentas
);

module.exports = router;