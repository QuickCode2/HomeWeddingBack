const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/send-memory", async (req, res) => {
  try {
    const {
      name,
      relationship,
      memory,
      wishes,
    } = req.body;

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
      subject: "New Wedding Memory Book Entry",
      html: `
        <h2>New Memory Submitted</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Relationship:</strong> ${relationship}</p>

        <p><strong>Favorite Memory:</strong> ${memory}</p>

        <p><strong>Blessings & Wishes:</strong> ${wishes}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Memory submitted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to submit memory",
    });
  }
});

module.exports = router;