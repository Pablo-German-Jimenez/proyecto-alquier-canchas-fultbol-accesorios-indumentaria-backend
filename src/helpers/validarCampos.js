import { validationResult } from 'express-validator';

export const validarResultado = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            mensaje: "Errores de validación",
            errores: errors.array() 
        });
    }
    next();
};