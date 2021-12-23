import mysql from "mysql";
import DatabaseUtils from "../../../Utils";
import CacheServie from '../../utils/CacheService';
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Product } from "../../utils/types";

export default class FilteredProviderSingleton {
	static instance: FilteredProviderSingleton;
	static dbName: string = "FilteredProvider";
	private user: string = DatabaseUtils.user;
	private password: string = DatabaseUtils.password;
	private cache: CacheServie = new CacheServie()

	connection: mysql.Connection | undefined;

	private constructor() {}

	public static async getInstance(): Promise<FilteredProviderSingleton> {
		if (!FilteredProviderSingleton.instance) {
			FilteredProviderSingleton.instance = new FilteredProviderSingleton();
		}

		await FilteredProviderSingleton.instance.connect();

		return FilteredProviderSingleton.instance;
	}

	public async connect(): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				this.connection = mysql.createConnection({
					host: "localhost",
					user: this.user,
					password: this.password,
					database: FilteredProviderSingleton.dbName,
				});

				this.connection.connect();

				resolve();
			} catch (e) {
				reject(e);
			}
		});
	}

	async getAll(): Promise<Array<Product>> {
		return new Promise((resolve, reject) => {
			this.connection?.query(
				new QueryBuilder().select(["*"], "Product").ExecuteQuery(),

				(error, result) => {
					if (error) {
						reject(error);
					}
					resolve(result);
				},
			);
		});
	}

	async getProduct(productId: string): Promise<Product> {
		const cacheKey = `product_${productId}`

		return new Promise((resolve, reject) => {
			this.connection?.query(
				new QueryBuilder().select(["*"], "Product").where("ProductId", productId).ExecuteQuery(),

				(error, result) => {
					if (error) {
						reject(error);
					}
					this.cache.set(cacheKey, result)
					resolve(result);
				},
			);
		});
	}

	
}
