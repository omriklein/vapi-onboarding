import cron from "node-cron";
import nodemailer from "nodemailer";

const HOURS_INTERVAL = 24;
const EMAIL_FROM = process.env.SUMMARY_EMAIL_SENDER;
const EMAIL_TO = process.env.SUMMARY_EMAIL_TARGET;
const GOOGLE_APP_PASSWORD = process.env.GOOGLE_APP_PASSWORD;
const EMAIL_SUBJECT = "VAPI Obnoarding - last 24h update";
const EMAIL_TEXT = "Here are the last 24 hours update..."; // TODO: Chagne to html file with the relevant info


console.log(`Opening email scheduler job from ${EMAIL_FROM} to ${EMAIL_TO} every ${HOURS_INTERVAL} hours`);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_FROM,
    pass: GOOGLE_APP_PASSWORD,
  },
});

async function sendEmail(): Promise<void> {
  try {
    const info = await transporter.sendMail({
      from: `"VAPI Onboarding" <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      subject: EMAIL_SUBJECT,
      text: EMAIL_TEXT,
    });
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

const cronExpression = `0 */${HOURS_INTERVAL} * * *`;

cron.schedule(cronExpression, () => {
  console.log(`Running job at ${new Date().toISOString()}`);
  sendEmail();
});

console.log(`Job scheduled to run every ${HOURS_INTERVAL} hour(s).`);
sendEmail();
