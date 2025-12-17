import { Router } from 'express'
import {
    getReservas,
    createReserva,
    updateReserva,
    deleteReserva
} from '../controllers/reservas.controller.js'

const router = Router()

router.get('/', getReservas)
router.post('/', createReserva)
router.put('/:id', updateReserva)
router.delete('/:id', deleteReserva)

export default router
