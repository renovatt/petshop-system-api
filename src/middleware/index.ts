import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import prismaClient from '../lib';

interface TokenPayload {
    userId: string;
}

export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {

    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({ error: 'Não autorizado.' });
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET ?? '');
        const { userId } = verifiedToken as TokenPayload;

        const foundUser = await prismaClient.user.findUnique({
            where: { id: userId }
        })

        const user = {
            id: userId,
            name: foundUser?.username,
            email: foundUser?.email,
        }

        if (!user) {
            return response.status(401).json({ error: 'Token inválido.' });
        }

        request.user = user

        return next()
    } catch (error: any) {
        return response.status(401).json({ error: error.message });
    }
}