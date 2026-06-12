const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/send-feedback", async (req, res) => {
  try {
    const { feedback, rating, createdAt } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Website Feedback",
      html: `
        <h2>New Feedback Received</h2>

        <p><strong>Rating:</strong> ${rating} ⭐</p>

        <p><strong>Feedback:</strong> ${feedback}</p>

        <p><strong>Date:</strong> ${createdAt}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Feedback sent successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to send feedback",
    });
  }
});

module.exports = router;