const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const check = require("../middlewares/auth");

// Rutas

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Crear una nueva cita
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dateTime
 *             properties:
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-20T14:00:00.000Z"
 *     responses:
 *       200:
 *         description: Cita reservada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Cita reservada correctamente.
 *                 appointment:
 *                   $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Fecha inválida o fuera de disponibilidad.
 *       409:
 *         description: Ese horario ya está reservado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/", check.auth, appointmentController.createAppointment);

/**
 * @swagger
 * /appointments/me:
 *   get:
 *     summary: Obtener mis citas
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de citas del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 appointments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/me", check.auth, appointmentController.getMyAppointments);

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Cancelar una cita
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cita a cancelar
 *         schema:
 *           type: string
 *           example: 6644e4b58e1c9d001fe209ac
 *     responses:
 *       200:
 *         description: Cita cancelada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Cita cancelada correctamente.
 *       403:
 *         description: El usuario no tiene permiso para cancelar esta cita
 *       404:
 *         description: Cita no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", check.auth, appointmentController.cancelAppointment);


// Exportar router
module.exports = router;