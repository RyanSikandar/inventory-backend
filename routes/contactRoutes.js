const express = require('express');
const protect = require('../middleware/authmiddleware');
const router = express.Router();
const { contactUs } = require('../controllers/contactController');
// Define your contact routes here
/**
 * @swagger
 * tags:
 *   name: ContactUs
 *   description: Contact us routes
 */

/**
 * @swagger
 * /contact-us:
 *   post:
 *     summary: Submit a contact us form
 *     tags: [ContactUs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - message
 *             properties:
 *               subject:
 *                 type: string
 *                 description: Subject of the message
 *               message:
 *                 type: string
 *                 description: The message content
 *     responses:
 *       200:
 *         description: Contact form submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Thank you for contacting us, we will get back to you shortly
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please fill in all fields
 */
router.post("/", protect, contactUs)

module.exports = router;