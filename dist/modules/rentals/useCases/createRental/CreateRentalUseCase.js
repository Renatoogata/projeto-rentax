"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalUseCase = void 0;

var _IRentalsRepository = require("@modules/rentals/repositories/IRentalsRepository");

var _AppError = require("@shared/errors/AppError");

var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");

var _tsyringe = require("tsyringe");

var _ICarsRepository = require("@modules/cars/repositories/ICarsRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let CreateRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateRentalUseCase {
  constructor(rentalsRepository, dateProvider, carsRepository) {
    this.rentalsRepository = rentalsRepository;
    this.dateProvider = dateProvider;
    this.carsRepository = carsRepository;
  }

  async execute({
    car_id,
    expected_return_date,
    user_id
  }) {
    const minimumHour = 24;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new _AppError.AppError("Car is unavailable");
    }

    const userUnavailable = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (userUnavailable) {
      throw new _AppError.AppError("Theres a rental is progess by user");
    }

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare < minimumHour) {
      throw new _AppError.AppError("Invalid return time!");
    }

    await this.carsRepository.updatAvailable(car_id, false);
    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    });
    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateRentalUseCase = CreateRentalUseCase;