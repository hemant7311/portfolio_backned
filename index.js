// 🔥 ENV CONFIG (MOST IMPORTANT)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const { Bio, projects } = require("./data/constants");

const app = express();

/* =========================
   MIDDLEWARES
========================= */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

/* =========================
   DEBUG LOG
========================= */
app.use((req, res, next) => {
  console.log("Incoming Request:", req.method, req.url);
  next();
});

/* =========================
   TEST ROUTE
========================= */
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
   SEND EMAIL API
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

    // 🔐 Ensure env loaded
    if (!process.env.MAIL || !process.env.PASS) {
      return res.status(500).json({
        ok: false,
        error: "Email credentials not configured",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASS, // Gmail App Password
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL}>`,
      to: process.env.MAIL_TO || process.env.MAIL,
      replyTo: email,
      subject: subject || `New message from ${name || "Visitor"}`,
      html: `
        <h3>📩 New Contact Message</h3>
        <p><b>Name:</b> ${name || "N/A"}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    return res.json({ ok: true, message: "Email sent successfully" });

  } catch (err) {
    console.error("MAIL ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
