import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
    usuario: { type: String, required: true },
    telefono: { type: String, required: true },
    cancha: { type: String, required: true },
    fecha: { type: String, required: true },
    horario: { type: String, required: true },
    estado: {
        type: String,
        enum: ['pendiente', 'confirmado'],
        default: 'pendiente'
    }
}, { timestamps: true });

reservaSchema.index({ cancha: 1, fecha: 1, horario: 1 }, { unique: true });

export default mongoose.model('Reserva', reservaSchema);