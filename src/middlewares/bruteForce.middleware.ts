import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { authConfig } from '../config/auth.config';

/**
 * Check if user account is locked due to failed login attempts
 */
export const checkAccountLockout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next();
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { failedLoginAttempts: true, lockoutUntil: true },
    });

    if (!user) {
      // Don't reveal that user doesn't exist (prevent enumeration)
      return next();
    }

    // Check if account is locked
    if (user.lockoutUntil && new Date() < user.lockoutUntil) {
      const remainingTime = Math.ceil(
        (user.lockoutUntil.getTime() - Date.now()) / 1000 / 60
      );
      return res.status(429).json({
        success: false,
        message: `Account is locked. Please try again in ${remainingTime} minutes`,
      });
    }

    // If lockout period has passed, reset failed attempts
    if (user.lockoutUntil && new Date() >= user.lockoutUntil) {
      await prisma.user.update({
        where: { email: email.toLowerCase() },
        data: {
          failedLoginAttempts: 0,
          lockoutUntil: null,
        },
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
