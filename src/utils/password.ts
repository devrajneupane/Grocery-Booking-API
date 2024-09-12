import crypto from "crypto";
import { sign } from "jsonwebtoken";
import { promisify } from "util";
import { env } from "../config";
import { IUser } from "../interface";

// Promisify the pbkdf2 function
const pbkdf2Promise = promisify(crypto.pbkdf2);

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(8).toString("hex");
  const hash = await pbkdf2Promise(password, salt, 1000, 32, "sha256");
  return `${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(
  storedPassword: string,
  inputPassword: string,
): Promise<boolean> {
  const [salt, storedHash] = storedPassword.split(":");
  const hash = await pbkdf2Promise(inputPassword, salt, 1000, 32, "sha256");
  return storedHash === hash.toString("hex");
}

/**
 * Sign payload with JWT secret
 *
 * @param payload User data
 * @returns accessToken and refreshToken
 */
export function signPayload(payload: Omit<IUser, "password">): {
  accessToken: string;
  refreshToken: string;
  error?: string;
} {
  const accessToken = sign(payload, env.jwt.secret!, {
    expiresIn: env.jwt.accessTokenExpiryMS,
  });

  const refreshToken = sign(payload, env.jwt.secret!, {
    expiresIn: env.jwt.refreshTokenExpiryMS,
  });

  return {
    accessToken,
    refreshToken,
  };
}
