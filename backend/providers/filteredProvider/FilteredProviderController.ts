import { Request, Response } from 'express';
import { ProductSpecification } from '../../utils/ProductSpecification';
import { Product } from '../../utils/types';
import FilteredProviderSingleton from './FilteredProviderSingleton';

export default class FilteredProviderController {
    private db!: FilteredProviderSingleton

    constructor() {
        FilteredProviderSingleton.getInstance().then(database => {
            this.db = database
        })
    }

    filterBy = async (req: Request, res: Response) => {

		const data = await this.db.getAllCombined();

		const filteredByParams = new ProductSpecification(data, req.query);

		res.status(200).json(filteredByParams.getSatisfiedBy());
	};

    getAll = async (_: Request, res: Response) => {
        const data: Array<Product > = await this.db.getAllCombined();

		res.status(200).json(data);
    }
}