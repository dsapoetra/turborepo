import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  // Simple validation for the example (replace with real logic)
  if (!token || token !== 'Bearer valid-token') {
    res.status(403).json({ message: 'Unauthorized' });
    return;
  }

  next(); // Pass control to the next middleware or route handler
};
