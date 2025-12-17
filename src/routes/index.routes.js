import { Router } from "express";
import productosRoutes from "./productos.routes.js";


const router = Router();
//http://localhost:3000/apiproductos/
router.use('/productos', productosRoutes)

export default router;