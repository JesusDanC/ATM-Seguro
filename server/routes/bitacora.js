const { Router } = require('express');
const { Ver_bitacora, Crear_bitacora, Actualizar_bitacora, Borrar_bitacora } = require('../controller/bitacora');

const router = Router();

router.get('/', Ver_bitacora);

router.post('/:id', [
    ], 
    Crear_bitacora
);

router.put('/:id', [
    ],
    Actualizar_bitacora
);

router.delete('/:id',
Borrar_bitacora
);

module.exports = router;