import express from 'express';
import { pingServerRouter } from '~/features';

export const router = express.Router();

router.use('/ping', pingServerRouter);
