import Reserva from '../models/reserva.js'
import mongoose from 'mongoose'

export const getReservas = async (req, res) => {
    const reservas = await Reserva.find()
    res.json(reservas)
}

const CANCHAS_VALIDAS = ['Cancha 1', 'Cancha 2']

export const createReserva = async (req, res) => {
    try {
        const { usuario, telefono, cancha, fecha, horario } = req.body

        if (!usuario || !telefono || !cancha || !fecha || !horario) {
            return res.status(400).json({ message: 'Datos incompletos' })
        }

        const telefonoRegex = /^\d{8,15}$/

        if (!telefonoRegex.test(telefono.trim())) {
            return res.status(400).json({ message: 'El teléfono debe contener solo números y tener entre 8 y 15 dígitos' })
        }

        if (!CANCHAS_VALIDAS.includes(cancha)) {
            return res.status(400).json({ message: 'Cancha inválida' })
        }

        const horarioRegex = /^([01]\d|2[0-3]):[0-5]\d$/
        if (!horarioRegex.test(horario)) {
            return res.status(400).json({ message: 'Horario inválido' })
        }

        const fechaReserva = new Date(fecha)
        if (isNaN(fechaReserva.getTime())) {
            return res.status(400).json({ message: 'Fecha inválida' })
        }

        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)
        fechaReserva.setHours(0, 0, 0, 0)

        if (fechaReserva < hoy) {
            return res.status(400).json({ message: 'No se permiten fechas pasadas' })
        }

        const existeReserva = await Reserva.findOne({ cancha, fecha, horario })
        if (existeReserva) {
            return res.status(409).json({ message: 'La cancha ya está reservada en ese horario' })
        }

        const reserva = new Reserva({
            usuario: usuario.trim(),
            telefono: telefono.trim(),
            cancha,
            fecha,
            horario
        })

        await reserva.save()
        res.status(201).json(reserva)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'La cancha ya está reservada en ese horario' })
        }
        res.status(500).json({ message: 'Error al crear la reserva' })
    }
}


export const updateReserva = async (req, res) => {
    try {
        const { id } = req.params
        const { usuario, telefono, cancha, fecha, horario } = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' })
        }

        const reservaActual = await Reserva.findById(id)
        if (!reservaActual) {
            return res.status(404).json({ message: 'Reserva no encontrada' })
        }


        if (cancha && !CANCHAS_VALIDAS.includes(cancha)) {
            return res.status(400).json({ message: 'Cancha inválida' })
        }

        if (horario) {
            const horarioRegex = /^([01]\d|2[0-3]):[0-5]\d$/
            if (!horarioRegex.test(horario)) {
                return res.status(400).json({ message: 'Horario inválido' })
            }
        }

        if (fecha) {
            const fechaReserva = new Date(fecha)
            if (isNaN(fechaReserva.getTime())) {
                return res.status(400).json({ message: 'Fecha inválida' })
            }

            const hoy = new Date()
            hoy.setHours(0, 0, 0, 0)
            fechaReserva.setHours(0, 0, 0, 0)

            if (fechaReserva < hoy) {
                return res.status(400).json({ message: 'No se permiten fechas pasadas' })
            }
        }

        const nuevaCancha = cancha || reservaActual.cancha
        const nuevaFecha = fecha || reservaActual.fecha
        const nuevoHorario = horario || reservaActual.horario

        const conflicto = await Reserva.findOne({
            _id: { $ne: id },
            cancha: nuevaCancha,
            fecha: nuevaFecha,
            horario: nuevoHorario
        })

        if (conflicto) {
            return res.status(409).json({ message: 'La cancha ya está reservada en ese horario' })
        }

        if (telefono) {
            const telefonoRegex = /^\d{8,15}$/
            if (!telefonoRegex.test(telefono.trim())) {
                return res.status(400).json({ message: 'El teléfono debe contener solo números y tener entre 8 y 15 dígitos' })
            }
        }
        
        let estadoValido = null;
        if (req.body.estado !== undefined) {
            if (['pendiente', 'confirmado'].includes(req.body.estado)) {
                estadoValido = req.body.estado;
            } else {
                return res.status(400).json({ message: 'Estado inválido. Use "pendiente" o "confirmado".' });
            }
        }

        const updateFields = {}
        if (usuario) updateFields.usuario = usuario.trim()
        if (telefono) updateFields.telefono = telefono.trim()
        if (cancha) updateFields.cancha = cancha
        if (fecha) updateFields.fecha = fecha
        if (horario) updateFields.horario = horario
        if (estadoValido !== null) updateFields.estado = estadoValido;

        const reservaActualizada = await Reserva.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        )

        res.status(200).json(reservaActualizada)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'La cancha ya está reservada en ese horario' })
        }
        console.log(error)
        res.status(500).json({ message: 'Error al actualizar reserva' })
    }
}

export const deleteReserva = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' })
        }

        const reserva = await Reserva.findById(id)
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' })
        }

        await Reserva.findByIdAndDelete(id)
        res.status(200).json({ message: 'Reserva eliminada' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la reserva' })
    }
}
