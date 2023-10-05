const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * v1/auth/:
 *   post:
 *     summary: Sends a otp
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: should be unique
 *             example:
 *               user_id: "Robert"
 */
router.post('/', validate(authValidation.sendOtp), authController.sendOtp);

/**
 * @swagger
 * v1/auth/:
 *   put:
 *     summary: Validates an Otp
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - otp
 *             properties:
 *               user_id:
 *                 type: string
 *               otp:
 *                 type: string
 *                 description: should be 5 digits
 *             example:
 *               user_id: "Robert"
 *               email: "73737"
 */
router.post('/verify', validate(authValidation.verifyOtp), authController.verifyOtp);

module.exports = router;
