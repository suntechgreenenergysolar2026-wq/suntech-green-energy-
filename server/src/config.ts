import path from "path";
import dotenv from "dotenv";

dotenv.config();

const toNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const config = {
  apiPort: toNumber(process.env.API_PORT, 4000),
  databaseUrl: process.env.DATABASE_URL?.trim() ?? "",
  databaseAutoCreate: process.env.DATABASE_AUTO_CREATE !== "false",
  jwtSecret: process.env.JWT_SECRET ?? "change-this-before-production",
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? "http://localhost:8080",
  uploadsDir: path.resolve(process.cwd(), "server", "uploads"),
  defaultAdmin: {
    name: process.env.ADMIN_NAME ?? "SUNTECH Admin",
    email: process.env.ADMIN_EMAIL ?? "admin@suntek.local",
    password: process.env.ADMIN_PASSWORD ?? "ChangeMe123!",
  },
  smtp: {
    host: process.env.SMTP_HOST ?? "",
    port: toNumber(process.env.SMTP_PORT, 587),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER ?? "",
    pass: process.env.SMTP_PASS ?? "",
    from: process.env.SMTP_FROM ?? "",
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID ?? "",
    authToken: process.env.TWILIO_AUTH_TOKEN ?? "",
    smsFrom: process.env.TWILIO_SMS_FROM ?? "",
    smsTo: process.env.TWILIO_SMS_TO ?? "",
    whatsappFrom: process.env.TWILIO_WHATSAPP_FROM ?? "",
    whatsappTo: process.env.TWILIO_WHATSAPP_TO ?? "",
  },
  crmWebhookUrl: process.env.CRM_WEBHOOK_URL ?? "",
};
