require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const { Bio, projects } = require("./data/constants");

const app = express();

/* =========================
   ERROR HANDLERS
========================= */
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   DEBUG LOG
========================= */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* =========================
   TEST ROUTES
========================= */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

/* =========================
   API ROUTES
========================= */
app.get("/api/bio", (req, res) => {
  res.json(Bio);
});

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

/* =========================
   EMAIL ROUTE
========================= */
app.post("/api/send-email", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({
        ok: false,
        error: "Email and message are required",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: subject || "Portfolio Contact",
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name || "N/A"}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.json({
      ok: true,
      message: "Email sent successfully",
    });

  } catch (err) {
    console.error("MAIL ERROR:", err);

    res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
});

/* =========================
   START SERVER
========================= */
const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});

server.on("error", (err) => {
  console.error("SERVER ERROR:", err);
});