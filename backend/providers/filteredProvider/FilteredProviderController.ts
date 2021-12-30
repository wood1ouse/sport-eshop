import { Request, Response } from "express";
import CacheService from "../../utils/CacheService";
import { ProductSpecification } from "../../utils/ProductSpecification";
import { Product } from "../../utils/types";
import FilteredProviderSingleton from "./FilteredProviderSingleton";

export default class FilteredProviderController {
	private db!: FilteredProviderSingleton;

	constructor() {
		FilteredProviderSingleton.getInstance().then((database) => {
			this.db = database;
		});
	}

	filterBy = async (req: Request, res: Response) => {
		const data = await this.db.getAll();

		const filteredByParams = new ProductSpecification(data, req.query);

		res.status(200).json(filteredByParams.getSatisfiedBy());
	};

	getAll = async (_: Request, res: Response) => {
		const data: Array<Product> = await this.db.getAll();

		setTimeout(() => {
			res.status(200).json(data);
		}, 5000)
	};

	getProduct = async (req: Request, res: Response) => {
		const { ProductId } = req.params;

		// slow variant
		const data = await this.db.getProduct(ProductId)

		setTimeout(() => {
			res.status(200).json(data);
		}, 5000);

		// if (data) {
		// 	clearTimeout(slowServerResponse);
		// 	res.status(200).json(data);
		// }
	};
}
