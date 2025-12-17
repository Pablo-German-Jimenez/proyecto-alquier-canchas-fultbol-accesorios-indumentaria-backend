import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Base de datos conectada correctamente');
    } catch (error) {
        console.error('Error al conectar la BD', error);
        throw new Error('Error al iniciar la base de datos');
    }
}

export default dbConnection;