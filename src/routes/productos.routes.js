import { Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
  obtenerProducto,
  crearProducto,
  editarProducto,
  borrarProducto,
  obtenerProductoPorId
} from "../controllers/product.controller.js";
import { check } from 'express-validator'; 
import { validarResultado } from '../helpers/validarCampos.js'; 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cancheros",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage: storage });
const router = Router();
router.get('/', obtenerProductoPorId);
router.get("/", obtenerProducto);
router.post('/', 
    upload.single('imagen'), 
    [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('precio', 'El precio es obligatorio y debe ser numérico').notEmpty().isNumeric(),
        check('categoria', 'La categoría es obligatoria').notEmpty(),
        validarResultado 
    ],
    crearProducto 
);
router.put('/:id', 
    upload.single('imagen'), 
    [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('precio', 'El precio es obligatorio').notEmpty().isNumeric(),
        check('categoria', 'La categoría es obligatoria').notEmpty(),
        validarResultado
    ],
    editarProducto 
);

router.delete("/:id", borrarProducto);

export default router;
