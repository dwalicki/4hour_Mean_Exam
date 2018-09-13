// Dependencies

import * as express from 'express';
/**
 * // a request logger for debugging purposes
    @param req express request object
    @param res express response object
    @param next cb to next function

*/
export const logger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`${req.method}:// ${req.originalUrl}`);
    next();
}

