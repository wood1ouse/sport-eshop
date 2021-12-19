import { Request, Response } from "express";

import { Product } from "./providers/utils/types";
import { ProductSpecification } from "./providers/utils/ProductSpecification";
import SingletonDB from "./SingletonDB";
import axios from 'axios';

export default class ShopController {
	private db: SingletonDB;

	constructor() {
		this.db = SingletonDB.getInstance();
	}
	combineData = async (req: Request, res: Response) => {
		const dbData: Array<Product> = await this.db.getAllCombined("SportShopDB");

		const firstProvider: Array<Product> = (await axios.get('http://localhost:3001/getproducts')).data

		const secondProvider: Array<Product> = (await axios.get('http://localhost:3002/getproducts')).data

		const combinedData = [...dbData, ...firstProvider, ...secondProvider];

		if (Object.keys(req.query).length === 0) {
			res.status(200).json(combinedData);
		} else {
			const filteredData = new ProductSpecification(combinedData, req.query);

			res.status(200).json(filteredData.getSatisfiedBy());
		}
	};
}
