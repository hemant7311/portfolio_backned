const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const { Bio, projects } = require("./data/constants");

const app = express();
const allowedOrigins = new Set([
  "https://hemantdeveloper.online",
  "https://www.hemantdeveloper.online",
  "http://localhost:3000",
]);

const corsOptions = {
  origin(origin, callback) {
    // Server-to-server requests and health checks do not send an Origin header.
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin is not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 204,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 10_000;

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  }[character]));
}

function getText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function getEmailConfiguration() {
  const { RESEND_API_KEY, RESEND_FROM, MAIL_TO } = process.env;

  if (!RESEND_API_KEY || !RESEND_FROM || !MAIL_TO) {
    console.error("Email configuration is incomplete. Set RESEND_API_KEY, RESEND_FROM, and MAIL_TO.");
    return null;
  }

  return { RESEND_API_KEY, RESEND_FROM, MAIL_TO };
}

app.use(cors(corsOptions));
app.use(express.json({ limit: "32kb" }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/api/bio", (req, res) => {
  res.json(Bio);
});

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.get("/api/send-email", (req, res) => {
  res.status(405).json({
    ok: false,
    error: "Use POST /api/send-email to send a message.",
  });
});

app.post("/api/send-email", async (req, res) => {
  const name = getText(req.body?.name);
  const email = getText(req.body?.email);
  const subject = getText(req.body?.subject);
  const message = getText(req.body?.message);

  if (!email || !message) {
    return res.status(400).json({ ok: false, error: "Email and message are required." });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ ok: false, error: "Enter a valid email address." });
  }

  if (name.length > MAX_NAME_LENGTH || subject.length > MAX_SUBJECT_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ ok: false, error: "Your message is too long." });
  }

  const emailConfiguration = getEmailConfiguration();
  if (!emailConfiguration) {
    return res.status(500).json({ ok: false, error: "Email service is not configured." });
  }

  try {
    const resend = new Resend(emailConfiguration.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: emailConfiguration.RESEND_FROM,
      to: [emailConfiguration.MAIL_TO],
      replyTo: email,
      subject: subject || `New portfolio message from ${name || "a visitor"}`,
      text: [
        "New portfolio contact message",
        `Name: ${name || "Not provided"}`,
        `Email: ${email}`,
        `Subject: ${subject || "Not provided"}`,
        "",
        message,
      ].join("\n"),
      html: `
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name || "Not provided")}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject || "Not provided")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend email request failed:", error);
      return res.status(502).json({ ok: false, error: "Unable to send your message. Please try again." });
    }

    console.log(`Email accepted by Resend: ${data?.id || "unknown id"}`);
    return res.status(200).json({ ok: true, message: "Email sent successfully." });
  } catch (error) {
    console.error("Resend email request failed:", error);
    return res.status(502).json({ ok: false, error: "Unable to send your message. Please try again." });
  }
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ ok: false, error: "Request body must be valid JSON." });
  }

  if (error.message === "Origin is not allowed by CORS") {
    return res.status(403).json({ ok: false, error: "Origin is not allowed." });
  }

  return next(error);
});

const PORT = Number(process.env.PORT) || 5001;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});

server.on("error", (error) => {
  console.error("Server error:", error);
});
