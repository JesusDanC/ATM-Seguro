const { Router } = require('express');
const { check } = require('express-validator');
const { Ver_tarjetas, Crear_tarjetas, Actualizar_tarjetas, Borrar_tarjetas } = require('../controller/tarjetas');

const router = Router();

router.get('/:id', Ver_tarjetas);

router.post('/:id', [
        check('numero_tarjeta', 'Este campo es obligatorio').not().isEmpty(),
        check('cvv', 'Este campo es obligatorio').not().isEmpty()
    ], 
    Crear_tarjetas
);

router.put('/:id',
    [
        check('numero_tarjeta', 'Este campo es obligatorio').not().isEmpty(),
        check('cvv', 'Este campo es obligatorio').not().isEmpty()
    ],
    Actualizar_tarjetas
);

router.delete('/:id',
Borrar_tarjetas
);

module.exports = router;