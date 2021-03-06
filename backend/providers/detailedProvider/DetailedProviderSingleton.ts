import mysql from "mysql";
import DatabaseUtils from "../../../Utils";
import { Product } from "../../utils/types";
import { QueryBuilder } from "../../utils/QueryBuilder";

export default class DetailedProviderSingleton {
	static instance: DetailedProviderSingleton;
	static dbName: string = "DetailedProvider";
	private user: string = DatabaseUtils.user;
	private password: string = DatabaseUtils.password;

	connection: mysql.Connection | undefined;

	private constructor() {}

	public static async getInstance(): Promise<DetailedProviderSingleton> {
		if (!DetailedProviderSingleton.instance) {
			DetailedProviderSingleton.instance = new DetailedProviderSingleton();
		}

		await DetailedProviderSingleton.instance.connect();

		return DetailedProviderSingleton.instance;
	}

	public async connect(): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				this.connection = mysql.createConnection({
					host: "localhost",
					user: this.user,
					password: this.password,
					database: "DetailedProvider",
				});

				this.connection.connect();

				resolve();
			} catch (e) {
				reject(e);
			}
		});
	}

	async getPriceList(table: string): Promise<Array<Product>> {
		return new Promise((resolve, reject) => {
			this.connection?.query(new QueryBuilder().select(["Product.ProductName", "Product.Price"], table).ExecuteQuery(), (error, results) => {
				if (error) {
					reject(error);
				} else resolve(results);
			});
		});
	}

	async getAllCombined(): Promise<Array<Product>> {
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

	async addProduct(product: Product) {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < 50000; i++) {
				this.connection?.query(
					new QueryBuilder().insertInto(["ProductName", "Brand", "Material", "Color"], Object.values(product) as any, "Product").ExecuteQuery(),

					(error, results) => {
						if (error) {
							reject(error);
						}
						resolve(results);
					},
				);
			}
		});
	}

	async getRowsCount(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.connection?.query(
				new QueryBuilder().select(["COUNT(*)"], "Product").ExecuteQuery(),

				(error, result) => {
					if (error) {
						reject(error);
					}

					resolve(result);
				},
			);
		});
	}

	async getPage(page: number): Promise<any> {
		const limit = 5000;
		const offset = limit * (page - 1);

		return new Promise((resolve, reject) => {
			this.connection?.query(
				new QueryBuilder().select(["*"], "Product").limit(limit).offset(offset).ExecuteQuery(),

				(error, result) => {
					if (error) {
						reject(error);
					}

					resolve(result);
				},
			);
		});
	}
}
