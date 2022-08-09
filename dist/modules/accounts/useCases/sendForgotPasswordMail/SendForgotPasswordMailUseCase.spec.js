"use strict";

var _UserRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UserRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send Forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UserRepositoryInMemory.UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "123456",
      email: "teste@gmail.com",
      name: "Paula Pinto",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("teste@gmail.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send an mail if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("Testee@teste.com.br")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
  });
  it("should be able to create a an users Tokens", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      driver_license: "987654",
      email: "email@email.com",
      name: "Renato Teste",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("email@email.com");
    expect(generateTokenMail).toBeCalled();
  });
});