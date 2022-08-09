"use strict";

var _UserRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UserRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("@shared/errors/AppError");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let userRepositoryInMemory;
let usersTokensRepositoryInMemory;
let createUserUseCase;
let dateProvider;
describe("Autenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new _UserRepositoryInMemory.UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(userRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(userRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    const user = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("should not to be able to authenticate an nonexist user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@pinto.com",
      password: "32321321"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect"));
  });
  it("should not to be able to authenticate with incorrect password", async () => {
    const user = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test"
    };
    await createUserUseCase.execute(user);
    expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "incorret password"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect"));
  });
});