import { ProductSpecification } from "./utils/ProductSpecification";
import { Filter, Product } from "./utils/types";
import { readFileSync } from "fs";
import { buildSchema } from "graphql";
import SingletonDB from "./SingletonDB";
import axios from "axios";

const schemaString = readFileSync("backend/schema.graphql", { encoding: "utf-8" });

let db!: SingletonDB;

SingletonDB.getInstance().then((database) => {
	db = database;
});

export const schema = buildSchema(schemaString);

export const root = {
	getProducts: async (filter: any) => {
		const dbData: Array<Product> = await db.getAllCombined();

		const firstProvider = await axios.get("http://localhost:3001/getproducts");

		const secondProvider = await axios.get("http://localhost:3002/getproducts");

		const combinedData = [...dbData, ...firstProvider.data, ...secondProvider.data];

		if (Object.keys(filter).length > 0) {
			const filteredData = new ProductSpecification(combinedData, filter["filter"]);
			return filteredData.getSatisfiedBy();
		}

		return combinedData;
	},

	addProduct: async (product: any) => {
        console.log(product);
        
		await db.addProduct(product["product"]);
        return true
	},
};
