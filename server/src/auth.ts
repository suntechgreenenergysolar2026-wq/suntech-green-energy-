import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "./config.js";

export type AdminTokenPayload = {
  adminId: number;
  email: string;
  name: string;
  role: string;
};

export type AuthenticatedRequest = Request & {
  admin?: AdminTokenPayload;
};

export const signAdminToken = (payload: AdminTokenPayload) =>
  jwt.sign(payload, config.jwtSecret, {
    expiresIn: "7d",
  });

export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required." });
  }

  const token = authHeader.slice("Bearer ".length);

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    if (typeof decoded === "string" || !("adminId" in decoded)) {
      return res.status(401).json({ message: "Invalid session token." });
    }

    req.admin = decoded as AdminTokenPayload;
    return next();
  } catch {
    return res.status(401).json({ message: "Session expired. Please sign in again." });
  }
};
