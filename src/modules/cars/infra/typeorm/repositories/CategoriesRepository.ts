import { getRepository, Repository } from "typeorm";

import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";

import { Category } from "../entities/Category";


class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category); // criar o acesso dos atributos dentro de Repository do typeorm
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {

        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    }

    async listAll(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;
    }

}

export { CategoriesRepository };