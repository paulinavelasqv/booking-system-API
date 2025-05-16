const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const check = require("../middlewares/auth");

// Rutas

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Obtener el perfil del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado (token inválido o faltante)
 *       500:
 *         description: Error interno del servidor
 */
router.get("/me", check.auth, userController.getProfile);

// Exportar router
module.exports = router;