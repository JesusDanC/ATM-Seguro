const { Router } = require('express');
const { check } = require('express-validator');
const { Ver_usuarios, Crear_usuarios, Actualizar_usuarios, Borrar_usuarios } = require('../controller/usuario');

const router = Router();

router.get('/', Ver_usuarios);

router.post('/', [
        check('nombre', 'Este campo es obligatorio').not().isEmpty(),
        check('pin', 'Este campo es obligatorio').not().isEmpty()
    ], 
    Crear_usuarios
);

router.put('/:id',
    [
        check('nombre', 'Este campo es obligatorio').not().isEmpty(),
        check('pin', 'Este campo es obligatorio').not().isEmpty()
    ],
    Actualizar_usuarios
);

router.delete('/:id',
    Borrar_usuarios
);

module.exports = router;