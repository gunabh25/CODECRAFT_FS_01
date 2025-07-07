import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendResetEmail(email: string, resetLink: string) {
  try {
    const data = await resend.emails.send({
      from: 'YourApp <no-reply@gunabhsharan.com>',
      to: email,
      subject: 'Reset Your Password',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Password Reset</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 30px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; padding: 40px;">
                    <tr>
                      <td style="text-align: center;">
                        <h2 style="color: #333;">🔒 Reset Your Password</h2>
                        <p style="color: #666; font-size: 16px;">We received a request to reset your password. Click the button below to proceed.</p>
                        <a href="${resetLink}" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                          Reset Password
                        </a>
                        <p style="color: #999; font-size: 14px; margin-top: 30px;">
                          This link will expire in 15 minutes.<br/>
                          If you didn’t request a password reset, you can safely ignore this email.
                        </p>
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
                        <p style="color: #bbb; font-size: 12px;">
                          © ${new Date().getFullYear()} YourApp • gunabhsharan.com
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    console.log('✅ Email sent');
    return data;
  } catch (error) {
    console.error('❌ Email failed:', error);
    throw new Error('Failed to send reset email');
  }
}
