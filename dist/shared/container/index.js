"use strict";

var _tsyringe = require("tsyringe");

require("@shared/container/providers");

var _UsersRepository = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");

var _CategoriesRepository = require("@modules/cars/infra/typeorm/repositories/CategoriesRepository");

var _SpecificationsRepository = require("@modules/cars/infra/typeorm/repositories/SpecificationsRepository");

var _CarsRepository = require("@modules/cars/infra/typeorm/repositories/CarsRepository");

var _CarsImagesRepository = require("@modules/cars/infra/typeorm/repositories/CarsImagesRepository");

var _RentalsRepository = require("@modules/rentals/infra/typeorm/repositories/RentalsRepository");

var _UsersTokensRepository = require("@modules/accounts/infra/typeorm/repositories/UsersTokensRepository");

// ICategoryRepository
_tsyringe.container.registerSingleton( //container criado para chamada
"CategoriesRepository", //nessa linha estamos definindo o nome para o container
_CategoriesRepository.CategoriesRepository //a classe que a gente quer chamar toda vez que o nome de cima for chamado
);

_tsyringe.container.registerSingleton("SpecificationsRepository", _SpecificationsRepository.SpecificationsRepository);

_tsyringe.container.registerSingleton("UsersRepository", _UsersRepository.UsersRepository);

_tsyringe.container.registerSingleton("CarsRepository", _CarsRepository.CarsRepository);

_tsyringe.container.registerSingleton("CarsImagesRepository", _CarsImagesRepository.CarsImagesRepository);

_tsyringe.container.registerSingleton("RentalsRepository", _RentalsRepository.RentalsRepository);

_tsyringe.container.registerSingleton("UsersTokensRepository", _UsersTokensRepository.UsersTokensRepository);