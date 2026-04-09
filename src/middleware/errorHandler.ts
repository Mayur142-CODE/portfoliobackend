import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    console.error('Error:', err.message);
    res.status(500).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
};

export const notFound = (req: Request, res: Response, _next: NextFunction): void => {
    res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};
