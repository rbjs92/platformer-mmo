import { Request } from 'express';
export interface RequestInterface extends Request {
    user: any;
    token: string;
}
