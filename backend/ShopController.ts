import axios from "axios";

import { Request, Response } from "express";

import { Product } from "./utils/types";
import { ProductSpecification } from "./utils/ProductSpecification";

import SingletonDB from "./SingletonDB";
import cache from "./utils/CacheService";

export default class ShopController {
	private db!: SingletonDB;

	constructor() {
		SingletonDB.getInstance().then((database) => {
			this.db = database;
		});
	}
	combineData = async (req: Request, res: Response) => {
		const dbData: Array<Product> = await this.db.getAllCombined();

		const firstProvider = await this.getFirstProvider()

		const secondProvider: Array<Product> = (await axios.get("http://localhost:3002/getproducts")).data;

		const combinedData = [...dbData, ...firstProvider, ...secondProvider];

		if (Object.keys(req.query).length === 0) {
			res.status(200).json(combinedData);
		} else {
			const filteredData = new ProductSpecification(combinedData, req.query);

			res.status(200).json(filteredData.getSatisfiedBy());
		}
	};

	getFirstProvider = async (): Promise<any> => {
		const result = []
		const limit = 5000
		const [rowsCount] = (await axios.get("http://localhost:3001/rowscount")).data;
		
		const pageCount = parseInt(Object.values(rowsCount)[0] as string) / limit
		
		for (let i = 1; i <= Math.ceil(pageCount); i++) {
			result.push((await axios.get(`http://localhost:3001/page/${i}`)).data)
		}

		return result
	}
	

	addMany = async (req: Request, res: Response) => {
		try {
			const product: Product = req.body;

			const results = await this.db.addMany(product);

			res.status(200).json(results);
		} catch (error) {
			res.status(500).json(error);
		}
	};

	addProduct = async (req: Request, res: Response) => {
		try {
			const product: Product = req.body;

			const results = await this.db.addProduct(product);

			res.status(200).json(results);
		} catch (error) {
			res.status(500).json(error);
		}
	};

	updateProduct = async (req: Request, res: Response) => {
		try {
			const product: Product = req.body;

			const results = await this.db.updateProduct(product);

			res.status(200).json(results);
		} catch (error) {
			res.status(500).json(error);
		}
	};

	deleteProduct = async (req: Request, res: Response) => {
		try {
			const { ProductId } = req.body;

			const results = await this.db.deleteProduct(ProductId);

			res.status(200).json(results);
		} catch (error) {
			res.status(500).json(error);
		}
	};

	getProduct = async (req: Request, res: Response) => {
		try {
			const { ProductId } = req.params;

			const results = await this.db.getProduct(ProductId);
			res.status(200).json(results);
		} catch (error) {
			res.status(500).json(error);
		}
	};

	getProviderPage = async (req: Request, res: Response) => {
		try {
			const {page} = req.params
			
			const pageResults = (await axios.get(`http://localhost:3001/page/${page}`)).data;

			cache.set(page, pageResults)

			res.status(200).json(pageResults)
 
		} catch (error) {
			res.status(500).json(error)
		}
	}

	getProviderProduct = async (req: Request, res: Response) => {
		try {
			const data = (await axios.get(`http://localhost:3002/getproducts`)).data

			cache.set("providerproducts", data)
			
			res.status(200).json(data)

		} catch (error) {
			res.status(500).json(error)
		}
	}
}
