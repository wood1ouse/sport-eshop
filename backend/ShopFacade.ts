import { Product } from "./types";
import { ProductSpecification } from "./Specification";
import { Request, Response } from "express";
import { db } from "./index";

class ShopFacade {
	async getPriceList(_: null, res: Response) {
		db.connect("DetailedProvider");
		const data: Array<Product> = await db.getPriceList("Product");

		res.status(200).json(data);
	}

	async getDetailed(req: Request, res: Response) {
		const data: Array<Product> = await ShopFacade.getAllRows(
			"DetailedProvider",
		);

		const productById = new ProductSpecification(data, req.params);

		res
			.status(200)
			.json(
				productById.getSatisfiedBy().length === 0
					? { message: "Can't find data!" }
					: productById.getSatisfiedBy(),
			);
	}

	async combineData(_: null, res: Response) {
		const dbData: Array<Product> = await ShopFacade.getAllRows("SportShopDB");
		const firstProvider: Array<Product> = await ShopFacade.getAllRows(
			"DetailedProvider",
		);
		const secondProvider: Array<Product> = await ShopFacade.getAllRows(
			"FilteredProvider",
		);

		res.status(200).json([...dbData, ...firstProvider, ...secondProvider]);
	}

	async filterBy(req: any, res: Response) {
		db.connect("FilteredProvider");
		const data = await db.filterBy();

		const filteredByParams = new ProductSpecification(data, req.query);

		res.status(200).json(filteredByParams.getSatisfiedBy());
	}

	static async getAllRows(database: string) {
		db.connect(database);

		const data = await db.getAll(database);

		return data;
	}
}

export default new ShopFacade();
