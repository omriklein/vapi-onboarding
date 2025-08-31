import nodemailer from "nodemailer";
import { getReport } from "./getReport";
import { generateEmailHtml, genarateSubject } from "./genarateEmailHtml";

const EMAIL_FROM = process.env.SUMMARY_EMAIL_SENDER;
const EMAIL_TO = process.env.SUMMARY_EMAIL_TARGET;
const GOOGLE_APP_PASSWORD = process.env.GOOGLE_APP_PASSWORD;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_FROM,
        pass: GOOGLE_APP_PASSWORD,
    },
});

export const sendEmail = async (hours: number): Promise<void> => {
    try {
        const users = await getReport(24);
        const htmlReport = generateEmailHtml(users, hours);
        const subject = genarateSubject(hours);

        const info = await transporter.sendMail({
            from: `"VAPI Onboarding" <${EMAIL_FROM}>`,
            to: EMAIL_TO,
            subject: subject,
            html: htmlReport,
        });
    } catch (error) {
        console.error("Error sending email:", error);
    }
};