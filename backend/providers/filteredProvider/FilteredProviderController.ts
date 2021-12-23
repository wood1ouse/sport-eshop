import { Request, Response } from "express";
import CacheService from "../../utils/CacheService";
import { ProductSpecification } from "../../utils/ProductSpecification";
import { Product } from "../../utils/types";
import FilteredProviderSingleton from "./FilteredProviderSingleton";

export default class FilteredProviderController {
	private db!: FilteredProviderSingleton;
	private cache!: CacheService;

	constructor() {
		FilteredProviderSingleton.getInstance().then((database) => {
			this.db = database;
			this.cache = new CacheService();
		});
	}

	filterBy = async (req: Request, res: Response) => {
		const data = await this.db.getAllCombined();

		const filteredByParams = new ProductSpecification(data, req.query);

		res.status(200).json(filteredByParams.getSatisfiedBy());
	};

	getAll = async (_: Request, res: Response) => {
		const data: Array<Product> = await this.db.getAllCombined();

		res.status(200).json(data);
	};

	getProduct = async (req: Request, res: Response) => {
		const { ProductId } = req.params;

		const data = await this.cache.get(ProductId, () => {
			return this.db.getProduct(ProductId);
		});

		// slow variant
		// const data = await this.db.getProduct(ProductId)

		const slowServerResponse = setTimeout(() => {
			res.status(200).json(data);
		}, 30000);

		if (data) {
			clearTimeout(slowServerResponse);
			res.status(200).json(data);
		}
	};
}
