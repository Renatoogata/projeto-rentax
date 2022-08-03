import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;


describe("Send Forgot mail", () => {

    beforeEach(() => {

        usersRepositoryInMemory = new UserRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    })

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "123456",
            email: "teste@gmail.com",
            name: "Paula Pinto",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("teste@gmail.com");


        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an mail if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("Testee@teste.com.br")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("should be able to create a an users Tokens", async () => {
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            driver_license: "987654",
            email: "email@email.com",
            name: "Renato Teste",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("email@email.com");

        expect(generateTokenMail).toBeCalled();

    })
});