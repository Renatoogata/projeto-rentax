import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';



class SendForgotPasswordMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        console.log("penese");
        const { email } = request.body;

        const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase);

        console.log("email", email);
        await sendForgotPasswordMailUseCase.execute(email);

        return response.send();
    }
}

export { SendForgotPasswordMailController }