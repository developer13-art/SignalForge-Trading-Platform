import { getAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const auth = getAuth(req);
  const userId = auth?.userId;

  if (!userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  res.locals.userId = userId;
  next();
}

export function getAuthenticatedUserId(res: Response): string {
  return res.locals.userId as string;
}