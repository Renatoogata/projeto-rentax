import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

@injectable() //isso faz com que essa classe possa ser injetada por uma outra classe, no caso o controller
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository") // nome utilizado na criação do container
        private categoriesRepository: ICategoriesRepository
    ) { }

    async execute({ description, name }: IRequest): Promise<void> {

        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new AppError("Category Already exists!");
        }

        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase }