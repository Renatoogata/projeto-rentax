"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileUserController = void 0;

var _tsyringe = require("tsyringe");

var _ProfileUserUseCase = require("./ProfileUserUseCase");

class ProfileUserController {
  async handle(request, response) {
    const {
      id
    } = request.user;

    const profileUserUseCase = _tsyringe.container.resolve(_ProfileUserUseCase.ProfileUserUseCase);

    const profileUser = await profileUserUseCase.execute(id);
    return response.json(profileUser);
  }

}

exports.ProfileUserController = ProfileUserController;