import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";



interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;
    const userTokensRepository = new UsersTokensRepository();

    if (!authHeader) {
        throw new AppError("Token is missing", 401);
    }

    //Bearer 90rufidsufdj420ifj90iwej
    //.spli esta separando a mensagem de cima quando tem espaço, na posição 0 que é a virgula nós ignoramos porque nao precisamos e na posição 1 
    //que é o token nos colocamos ele na variavel split
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload;

        const user = await userTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        if (!user) {
            throw new AppError("User does not exists", 401);
        }

        request.user = {
            id: user_id
        }

        next();
    } catch {
        throw new AppError("Invalid Token", 401);
    }

}