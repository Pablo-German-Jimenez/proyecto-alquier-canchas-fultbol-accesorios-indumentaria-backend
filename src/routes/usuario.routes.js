import { Router } from 'express';
import { 
    crearUsuario, 
    loginUsuario, 
    listarUsuarios, 
    borrarUsuario,
     editarUsuario 
} from '../controllers/usuario.controller.js';
import { check } from 'express-validator';
import { validarResultado } from '../helpers/validarCampos.js';
const router = Router();

router.post('/registro', 
    [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio y debe ser válido').isEmail(),
        check('password', 'La contraseña debe tener 8 caracteres, mayúscula, minúscula, número y símbolo')
            .isLength({ min: 8 })
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/),
        validarResultado
    ],
    crearUsuario
);
router.post('/login', loginUsuario);

router.get('/', listarUsuarios);
router.delete('/:id', borrarUsuario);
router.put('/:id', 
    [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email debe ser válido').isEmail(),
        validarResultado
    ],
    editarUsuario
);

export default router;