import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        unique: true, 
        required: true,
        trim: true,
        lowercase: true 
    },
     telefono: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    }
}, {
    timestamps: true 
});

export default mongoose.model('Usuario', usuarioSchema);