"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

let listAvailableCarUseCase;
let carsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car1",
      "description": "Car description",
      "daily_rate": 110.0,
      "license_plate": "DEF-1234",
      "fine_amount": 40,
      "brand": "Car_brand",
      "category_id": "category_id"
    });
    const cars = await listAvailableCarUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("sould be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car2",
      "description": "Car description",
      "daily_rate": 110.0,
      "license_plate": "DEF-1234",
      "fine_amount": 40,
      "brand": "Car_brand_test",
      "category_id": "category_id"
    });
    const cars = await listAvailableCarUseCase.execute({
      brand: "Car_brand_test"
    });
    expect(cars).toEqual([car]);
  });
  it("sould be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car3",
      "description": "Car description",
      "daily_rate": 110.0,
      "license_plate": "DEF-1235",
      "fine_amount": 40,
      "brand": "Car_brand_test",
      "category_id": "category_id"
    });
    const cars = await listAvailableCarUseCase.execute({
      name: "Car3"
    });
    expect(cars).toEqual([car]);
  });
  it("sould be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car4",
      "description": "Car description",
      "daily_rate": 110.0,
      "license_plate": "DEF-1236",
      "fine_amount": 40,
      "brand": "Car_brand_test",
      "category_id": "12345"
    });
    const cars = await listAvailableCarUseCase.execute({
      category_id: "12345"
    });
    expect(cars).toEqual([car]);
  });
});