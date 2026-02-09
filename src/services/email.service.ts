import { emailTransporter, emailConfig } from '../config/email.config';
import { authConfig } from '../config/auth.config';

export const emailService = {
  /**
   * Send email verification link
   */
  async sendVerificationEmail(email: string, token: string, name: string): Promise<void> {
    const verificationUrl = `${authConfig.urls.frontend}/verify-email?token=${token}`;

    const mailOptions = {
      from: emailConfig.from,
      to: email,
      subject: 'Verify Your Email - MoodNote',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Welcome to MoodNote, ${name}!</h2>
          <p style="color: #666; line-height: 1.6;">Thank you for registering. Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="display: inline-block; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
          </div>
          <p style="color: #666; line-height: 1.6;">Or copy and paste this link into your browser:</p>
          <p style="color: #007bff; word-break: break-all;">${verificationUrl}</p>
          <p style="color: #999; font-size: 14px; margin-top: 30px;">This link will expire in 24 hours.</p>
          <p style="color: #999; font-size: 14px;">If you didn't create an account, please ignore this email.</p>
        </div>
      `,
    };

    await emailTransporter.sendMail(mailOptions);
  },

  /**
   * Send password reset OTP
   */
  async sendPasswordResetEmail(email: string, otp: string, name: string): Promise<void> {
    const mailOptions = {
      from: emailConfig.from,
      to: email,
      subject: 'Password Reset Request - MoodNote',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p style="color: #666; line-height: 1.6;">Hi ${name},</p>
          <p style="color: #666; line-height: 1.6;">We received a request to reset your password. Use the following OTP to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; display: inline-block;">
              <h1 style="margin: 0; letter-spacing: 8px; color: #333;">${otp}</h1>
            </div>
          </div>
          <p style="color: #999; font-size: 14px; margin-top: 30px;">This OTP will expire in 1 hour.</p>
          <p style="color: #999; font-size: 14px;">If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
        </div>
      `,
    };

    await emailTransporter.sendMail(mailOptions);
  },

  /**
   * Send password changed notification
   */
  async sendPasswordChangedEmail(email: string, name: string): Promise<void> {
    const mailOptions = {
      from: emailConfig.from,
      to: email,
      subject: 'Password Changed - MoodNote',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Password Changed Successfully</h2>
          <p style="color: #666; line-height: 1.6;">Hi ${name},</p>
          <p style="color: #666; line-height: 1.6;">Your password has been changed successfully.</p>
          <p style="color: #666; line-height: 1.6;">If you did not make this change, please contact our support team immediately.</p>
          <p style="color: #999; font-size: 14px; margin-top: 30px;">For security reasons, all other sessions have been logged out.</p>
        </div>
      `,
    };

    await emailTransporter.sendMail(mailOptions);
  },
};
