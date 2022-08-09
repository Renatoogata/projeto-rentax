"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalsByUserController = void 0;

var _tsyringe = require("tsyringe");

var _ListRentalsByUserUseCase = require("./ListRentalsByUserUseCase");

class ListRentalsByUserController {
  async handle(request, response) {
    const listRentalsByUserUseCase = _tsyringe.container.resolve(_ListRentalsByUserUseCase.ListRentalsByUserUseCase);

    const {
      id
    } = request.user;
    const rentals = await listRentalsByUserUseCase.execute(id);
    return response.json(rentals);
  }

}

exports.ListRentalsByUserController = ListRentalsByUserController;