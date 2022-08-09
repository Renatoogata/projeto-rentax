"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionController = void 0;

var _tsyringe = require("tsyringe");

var _DevolutionRentalUseCase = require("./DevolutionRentalUseCase");

class DevolutionController {
  async handle(request, response) {
    const {
      id: user_id
    } = request.user; //user id

    const {
      id
    } = request.params; // http://localhost:3333/rentals/devolution/{id} rental Id

    const devolutionRentalUseCase = _tsyringe.container.resolve(_DevolutionRentalUseCase.DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
      id,
      user_id
    });
    return response.status(200).json(rental);
  }

}

exports.DevolutionController = DevolutionController;