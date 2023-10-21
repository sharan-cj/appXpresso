import { Request, Response } from 'express';

export const handlePing = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello, You've reached the server",
    timestamp: new Date().toISOString(),
  });
};
