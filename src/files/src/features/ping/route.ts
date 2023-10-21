import express from 'express';
import { handlePing } from './controller';

export const pingServerRouter = express.Router();

pingServerRouter.get('/', handlePing);
