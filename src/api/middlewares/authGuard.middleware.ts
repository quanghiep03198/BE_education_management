import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpStatusCode } from '../../configs/statusCode.config';
import redisClient from '../../database/redis';
import { HttpException } from '../../types/httpException.type';
import { AuthRedisKeyPrefix } from '../../types/redis.type';
import { UserRoleEnum } from '../../types/user.type';

export const checkAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.cookies.uid) throw createHttpError.Unauthorized('Invalid auth id!');
		const accessTokenKey = AuthRedisKeyPrefix.ACCESS_TOKEN + req.cookies.uid;
		const storedAccessToken = await redisClient.get(accessTokenKey);
		if (!storedAccessToken) throw createHttpError.Unauthorized();
		const accessToken = req.cookies.access_token;
		if (!accessToken) throw createHttpError.Unauthorized();
		const { payload } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
		req.profile = payload;
		req.role = payload.role;
		next();
	} catch (error) {
		const httpException = new HttpException(error);
		return res.status(httpException.statusCode).json(httpException);
	}
};

export const checkIsHeadmaster = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.role !== UserRoleEnum.HEADMASTER) {
			throw createHttpError.Forbidden('Only headmaster allowed to access!');
		}
		next();
	} catch (error) {
		const httpException = new HttpException(error);
		return res.status(httpException.statusCode).json(httpException);
	}
};

export const checkIsTeacher = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const teacherRoles = Object.values(UserRoleEnum).filter((role) => role !== UserRoleEnum.PARENTS);
		if (teacherRoles.indexOf(req.role) === -1) {
			return res.status(HttpStatusCode.FORBIDDEN).json({
				message: 'Only teacher/headmaster allowed to access!',
				statusCode: HttpStatusCode.FORBIDDEN
			});
		}
		next();
	} catch (error) {
		const httpException = new HttpException(error);
		return res.status(httpException.statusCode).json(httpException);
	}
};
