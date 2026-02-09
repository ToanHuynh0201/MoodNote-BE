import bcrypt from 'bcrypt';
import { authConfig } from '../config/auth.config';

export const passwordUtil = {
  /**
   * Hash a password using bcrypt
   */
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, authConfig.bcrypt.saltRounds);
  },

  /**
   * Compare a plain password with a hashed password
   */
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  },

  /**
   * Validate password strength
   * Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
   */
  validate(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  /**
   * Check if password is commonly used (basic check)
   */
  isCommonPassword(password: string): boolean {
    const commonPasswords = [
      'password', 'password123', '12345678', 'qwerty', 'abc123',
      'monkey', '1234567', 'letmein', 'trustno1', 'dragon',
      'baseball', 'iloveyou', 'master', 'sunshine', 'ashley',
      'bailey', 'passw0rd', 'shadow', '123123', '654321',
    ];
    return commonPasswords.includes(password.toLowerCase());
  },
};
