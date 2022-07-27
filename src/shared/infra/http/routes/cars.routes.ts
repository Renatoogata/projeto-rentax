import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';


const carsRoutes = Router();

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes }