require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const { Bio, projects } = require("./data/constants");

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Validate required fields
    if (!email || !message) {
      return res.status(400).json({
        ok: false,
        error: "Email and message are required",
      });
    }

    // Validate Resend API key is set
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set in environment variables");
      return res.status(500).json({
        ok: false,
        error: "Server configuration error",
      });
    }

    // Validate recipient email is set
    if (!process.env.MAIL_TO) {
      console.error("MAIL_TO is not set in environment variables");
      return res.status(500).json({
        ok: false,
        error: "Server configuration error",
      });
    }

    // Validate from email is set (should be from your Resend verified domain)
    if (!process.env.MAIL_FROM) {
      console.error("MAIL_FROM is not set in environment variables");
      return res.status(500).json({
        ok: false,
        error: "Server configuration error",
      });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: subject || "Portfolio Contact",
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return res.status(500).json({
        ok: false,
        error: error.message || "Failed to send email",
      });
    }

    console.log("Email sent successfully:", data);
    return res.status(200).json({
      ok: true,
      message: "Email sent successfully",
    });

  } catch (err) {
    console.error("MAIL ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: err.message || "Internal server error",
    });
  }
});

/* =========================
   START SERVER
========================= */
const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
  console.log("📧 Email service initialized with Resend");
});

server.on("error", (err) => {
  console.error("SERVER ERROR:", err);
});