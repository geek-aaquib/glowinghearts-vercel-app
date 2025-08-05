// /lib/sendErrorAlert.ts
import nodemailer from 'nodemailer'

export async function sendErrorAlert(subject: string, errorDetails: string) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        const info = await transporter.sendMail({
            from: `"GHF 5050 Alerts" <${process.env.SMTP_USER}>`,
            to: process.env.EMAIL_TO,
            cc: process.env.CC,
            subject: subject,
            text: errorDetails,
        })

        console.log('Alert email sent: %s', info.messageId)
    } catch (err) {
        console.error('Failed to send error alert email:', err)
    }
}
