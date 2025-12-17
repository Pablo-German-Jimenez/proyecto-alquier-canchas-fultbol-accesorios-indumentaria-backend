import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dbConnection from './dbConfig.js';
import reservasRoutes from '../routes/reservas.route.js'
import productRoutes from '../routes/productos.routes.js'; 
import usuarioRoutes from '../routes/usuario.routes.js';
import { crearAdminPorDefecto } from '../helpers/inicializarDatos.js'; 

export default class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.productsPath = '/api/products';
         this.usuariosPath = '/api/usuarios';
        this.reservasPath = '/api/reservas'
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    
    async conectarDB() {
        await dbConnection();
        await crearAdminPorDefecto(); 
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        const __dirname = dirname(fileURLToPath(import.meta.url));
        this.app.use(express.static(__dirname + '/../../public'));
    }
    routes() {
        this.app.use(this.productsPath, productRoutes)
         this.app.use(this.usuariosPath, usuarioRoutes); 
        this.app.use(this.reservasPath, reservasRoutes)
    }
    listen() {
        this.app.listen(this.port, () => console.info(`Servidor ejecutándose en: http://localhost:${this.port}`));
    }
}




