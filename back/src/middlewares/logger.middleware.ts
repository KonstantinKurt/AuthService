import {
    Injectable,
    NestMiddleware,
    Logger, Req,
} from '@nestjs/common';
import {Request, Response} from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        Logger.log(`
           protocol: ${req.protocol};
           method: ${req.method},
           body: ${JSON.stringify(req.body)}
           url: ${req.baseUrl};
           `);
        next();
    }
}
