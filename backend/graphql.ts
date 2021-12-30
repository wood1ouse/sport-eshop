import { ProductSpecification } from "./utils/ProductSpecification";
import { Product, ProductCartType } from "./utils/types";
import { readFileSync } from "fs";
import { buildSchema } from "graphql";
import SingletonDB from "./SingletonDB";
import axios from "axios";
import { createCart } from "./utils/CartService";

const schemaString = readFileSync("backend/schema.graphql", { encoding: "utf-8" });

let db!: SingletonDB;

SingletonDB.getInstance().then((database) => {
	db = database;
});
export const schema = buildSchema(schemaString);

const addToCart = createCart();

export const root = {
	getProducts: async (filter: any) => {
		const dbData: Array<Product> = await db.getAllCombined();

		const firstProvider = await axios.get("http://localhost:3001/getproducts");

		const secondProvider = await axios.get("http://localhost:3002/getproducts");

		const combinedData = [...dbData, ...firstProvider.data, ...secondProvider.data];

		if (Object.keys(filter).length > 0) {
			const filteredData = new ProductSpecification(combinedData, filter["product"]);
			return filteredData.getSatisfiedBy();
		}

		return combinedData;
	},

	addProduct: async (product: any) => {
		await db.addProduct(product["product"]);
		return true;
	},

	deleteProduct: async (product: any) => {
		await db.deleteProduct(product["product"]);
		return true;
	},

	updateProduct: async (product: any) => {
		await db.updateProduct(product["product"]);
		return true;
	},

	addProductToCart: async (product: any) => {
		const [data] = await root.getProducts(product);

		return addToCart(data);
	},
};
