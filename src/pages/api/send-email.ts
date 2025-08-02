import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

type Data = { success: boolean; error?: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const { firstName, lastName, company, email, phoneNumber, message } = req.body

  if (!firstName || !lastName || !company || !email || !phoneNumber || !message) {
    return res.status(400).json({ success: false, error: 'Missing fields' })
  }

  // Create SMTP transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New message from ${firstName}`,
      text: `
        You got a new message from your website:

        Name: ${firstName}
        Email: ${email}

        Message:
        ${message}
      `,
      html: `<p><strong>First Name:</strong> ${firstName}</p>
             <p><strong>Last Name:</strong> ${lastName}</p>
             <p><strong>Company:</strong> ${company}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone Number:</strong> ${phoneNumber}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    })

    return res.status(200).json({ success: true })
  } catch (err: any) {
    console.error('Email send error:', err)
    return res.status(500).json({ success: false, error: err.message })
  }
}