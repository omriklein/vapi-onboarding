import cron from "node-cron";
import { sendEmail } from "./sendEmail";

const HOURS_INTERVAL = 24;

const cronExpression = `0 */${HOURS_INTERVAL} * * *`;

cron.schedule(cronExpression, () => {
  console.log(`Running job at ${new Date().toISOString()}`);
  sendEmail(HOURS_INTERVAL);
  console.log(`Email sent successfully!`);
});

// Send Email when the job starts to run
console.log(`Job scheduled to run every ${HOURS_INTERVAL} hour(s).`);
sendEmail(HOURS_INTERVAL);
