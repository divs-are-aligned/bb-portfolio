const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const nodemailer = require("nodemailer");

const gmailAppPassword = defineSecret("GMAIL_APP_PASSWORD");

const WATERING_LABELS = {
  daily: "Every day",
  "few-days": "Every few days",
  weekly: "Once a week",
  whenever: "When I remember",
  never: "What's watering?",
};

const SOIL_LABELS = {
  soaking: "Soaking wet",
  moist: "Moist",
  dry: "Dry",
  "bone-dry": "Bone dry & crusty",
};

const LIGHT_LABELS = {
  "full-sun": "Full sun",
  "bright-indirect": "Bright indirect",
  "low-light": "Low light",
  dungeon: "Windowless dungeon",
};

const PEST_LABELS = {
  none: "No bugs",
  suspicious: "Suspicious dots",
  infestation: "Full infestation",
  refuse: "I refuse to look",
};

exports.onPlantHelp = onDocumentCreated(
  {
    document: "plant-help/{docId}",
    secrets: [gmailAppPassword],
  },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bartoszbudak@gmail.com",
        pass: gmailAppPassword.value(),
      },
    });

    const isPanic = data.panicMode ? "YES" : "No";
    const imageLinks = (data.images || [])
      .map((url, i) => `  Photo ${i + 1}: ${url}`)
      .join("\n");

    const body = [
      `New Plant S.O.S. from ${data.name} (${data.email})`,
      "",
      `Panic mode: ${isPanic}`,
      "",
      "--- Diagnostics ---",
      `Watering:  ${WATERING_LABELS[data.watering] || data.watering || "—"}`,
      `Soil:      ${SOIL_LABELS[data.soil] || data.soil || "—"}`,
      `Light:     ${LIGHT_LABELS[data.light] || data.light || "—"}`,
      `Pests:     ${PEST_LABELS[data.pests] || data.pests || "—"}`,
      "",
      "--- Notes ---",
      data.notes || "(none)",
      "",
      "--- Photos ---",
      imageLinks || "(none uploaded)",
    ].join("\n");

    const subject = data.panicMode
      ? `PLANT S.O.S. from ${data.name} — PANIC MODE`
      : `Plant S.O.S. from ${data.name}`;

    await transporter.sendMail({
      from: `"Plant S.O.S." <bartoszbudak@gmail.com>`,
      to: "bartoszbudak@gmail.com",
      replyTo: data.email,
      subject,
      text: body,
    });

    console.log(`Email sent for submission from ${data.name}`);
  },
);
