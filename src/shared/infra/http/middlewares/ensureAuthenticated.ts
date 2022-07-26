import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";



interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token is missing", 401);
    }

    //Bearer 90rufidsufdj420ifj90iwej
    //.spli esta separando a mensagem de cima quando tem espaço, na posição 0 que é a virgula nós ignoramos porque nao precisamos e na posição 1 
    //que é o token nos colocamos ele na variavel split
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "9a3636732029f02d621cdb53c0367d35") as IPayload;

        const usersRepository = new UsersRepository();

        const user = usersRepository.findById(user_id);

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