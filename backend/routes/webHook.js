import express from 'express';
import webhookController from '../controllers/webhookController.js';

const webHookRouter = express.Router();

// Make sure to apply express.raw ONLY for this route
webHookRouter.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    webhookController
);

export default webHookRouter;
