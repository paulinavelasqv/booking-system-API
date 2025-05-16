const express = require('express');
const router = express.Router();
const check = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const adminController = require("../controllers/adminController");

router.use(check.auth, isAdmin); // Todas las rutas debajo requieren admin

// Rutas

/**
 * @swagger
 * /admin/appointments:
 *   get:
 *     summary: Obtener todas las citas (solo admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las citas
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
 *       403:
 *         description: Acceso denegado (no admin)
 *       500:
 *         description: Error interno del servidor
 */
router.get("/appointments", adminController.getAllAppointments);

/**
 * @swagger
 * /admin/availability:
 *   post:
 *     summary: Crear un bloque de disponibilidad (solo admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dayOfWeek
 *               - startTime
 *               - endTime
 *             properties:
 *               dayOfWeek:
 *                 type: integer
 *                 description: Día de la semana (0=Domingo, 1=Lunes,...)
 *                 example: 1
 *               startTime:
 *                 type: string
 *                 description: Hora inicio formato HH:mm
 *                 example: "09:00"
 *               endTime:
 *                 type: string
 *                 description: Hora fin formato HH:mm
 *                 example: "17:00"
 *     responses:
 *       201:
 *         description: Bloque de disponibilidad creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 availability:
 *                   $ref: '#/components/schemas/Availability'
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: Acceso denegado (no admin)
 *       500:
 *         description: Error interno del servidor
 */
router.post("/availability", adminController.createAvailability);

/**
 * @swagger
 * /admin/availability:
 *   get:
 *     summary: Obtener bloques de disponibilidad actuales (solo admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de bloques de disponibilidad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 availability:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Availability'
 *       403:
 *         description: Acceso denegado (no admin)
 *       500:
 *         description: Error interno del servidor
 */
router.get("/availability", adminController.getAvailability);

/**
 * @swagger
 * /admin/availability/{id}:
 *   delete:
 *     summary: Eliminar un bloque de disponibilidad (solo admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del bloque de disponibilidad a eliminar
 *         schema:
 *           type: string
 *           example: 6644e4b58e1c9d001fe209ac
 *     responses:
 *       200:
 *         description: Bloque de disponibilidad eliminado correctamente
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
 *                   example: Bloque eliminado correctamente.
 *       403:
 *         description: Acceso denegado (no admin)
 *       404:
 *         description: Bloque no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/availability/:id", adminController.deleteAvailability);

module.exports = router;