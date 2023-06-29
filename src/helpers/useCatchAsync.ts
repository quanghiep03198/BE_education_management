import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../types/httpException.type';

type TAsyncFn = (req: Request, res: Response, next?: NextFunction) => Promise<any>;

const useCatchAsync = (fn: TAsyncFn) => (req: Request, res: Response) =>
	Promise.resolve(fn(req, res)).catch((error) => {
		const httpException = new HttpException(error);
		return res.status(httpException.statusCode).json(httpException);
	});

export default useCatchAsync;
