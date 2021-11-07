import express from "express";
import { db } from "./index";

class ShopController {
	async getPriceList(_: any, res: express.Response) {
		db.connect("DetailedProvider");
		const data = await db.getPriceList("Product");

		res.status(200).json(data);
	}

	async getDetailed(req: express.Request, res: express.Response) {
		db.connect("DetailedProvider");
		const { id } = req.params;
		const data: Array<object> = await db.getDetailed(id);

		res.status(200).json(data.length === 0 ? "Can't find data!" : data);
	}

	async combineData(_: any, res: express.Response) {
		const dbData = await ShopController.getAllRows("SportShopDB");
		const firstProvider = await ShopController.getAllRows("DetailedProvider");
		const secondProvider = await ShopController.getAllRows("FilteredProvider");

		res.status(200).json([...dbData, ...firstProvider, ...secondProvider]);
	}

	static async getAllRows(database: string) {
		db.connect(database);
        
        const data = await db.getAll(database);

        return data
	}
}

export default new ShopController();
