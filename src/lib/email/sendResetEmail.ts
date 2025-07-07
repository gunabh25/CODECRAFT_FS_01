import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendResetEmail(email: string, resetLink: string) {
  try {
    const data = await resend.emails.send({
      from: 'Gunabh<no-reply@gmail.com>',
      to: email,
      subject: 'Reset Your Password',
      html: `
        <p>Hello,</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    return data;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
}
