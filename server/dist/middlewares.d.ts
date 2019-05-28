import { Request, Response } from 'express';
import { RequestInterface } from './interfaces/RequestInterface';
declare const _default: {
    onTokenSetUser(req: RequestInterface, res: Response, next: any): Promise<void>;
    isLoggedIn(req: RequestInterface, res: Response, next: any): void;
    notFound(req: Request, res: Response, next: any): void;
    errorHandler(err: any, req: Request, res: Response): void;
};
export = _default;
