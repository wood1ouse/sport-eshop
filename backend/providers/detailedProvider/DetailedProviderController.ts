import { Request, Response } from "express";
import CacheServie from "../../utils/CacheService";
import { ProductSpecification } from "../../utils/ProductSpecification";
import { Product } from "../../utils/types";
import DetailedProviderSingleton from "./DetailedProviderSingleton";

export default class DetailedProviderController {
	private db!: DetailedProviderSingleton;

	constructor() {
		DetailedProviderSingleton.getInstance().then((database) => {
			this.db = database;
		});
	}

	getDetailed = async (req: Request, res: Response) => {
		const data: Array<Product> = await this.db.getAllCombined();

		const productById = new ProductSpecification(data, req.params);

		res.status(200).json(productById.getSatisfiedBy().length === 0 ? { message: "Can't find data!" } : productById.getSatisfiedBy());
	};

	getPriceList = async (_: Request, res: Response) => {
		const data: Array<Product> = await this.db.getPriceList("Product");

		res.status(200).json(data);
	};

	getAll = async (_: Request, res: Response) => {
		const data: Array<Product> = await this.db.getAllCombined();

		res.status(200).json(data);
	};

	addProduct = async (req: Request, res: Response) => {

		const result = await this.db.addProduct(req.body);

		res.status(200).json(result);
	};

	getPage = async (req: Request, res: Response) => {
		try {
			const { page } = req.params;

			const results = await this.db.getPage(parseInt(page));


			res.status(200).json(results);
		} catch (error) {
			res.status(500).json(error);
		}
	};
	
	getRowsCount = async (_: Request, res: Response) => {
		try {
			res.status(200).json((await this.db.getRowsCount()))

		} catch (error) {
			res.status(500).json(error)
		}
	}


}
