const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

const sendContactForm = async (req, res) => {
  try {
    const {
      service,
      name,
      email,
      phone,
      company,
      budget,
      timeline,
      message,
    } = req.body;

    const newContact = await Contact.create({
      service,
      name,
      email,
      phone,
      company,
      budget,
      timeline,
      message,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: `New Website Inquiry - ${service}`,
      html: `
      <h2>New Inquiry</h2>

      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Company:</b> ${company}</p>
      <p><b>Budget:</b> ${budget}</p>
      <p><b>Timeline:</b> ${timeline}</p>
      <p><b>Message:</b> ${message}</p>`,
    });

    res.status(200).json({
      success: true,
      message: "Inquiry Sent Successfully",
      data: newContact,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  sendContactForm,
};