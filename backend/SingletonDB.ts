import mysql from "mysql";
import DatabaseUtils from "../Utils";
import { QueryBuilder } from "./utils/QueryBuilder";
import { Product } from "./utils/types";

export default class SingletonDB {
	static instance: SingletonDB;
	static dbName: string = "SportShopDB";
	private user: string = DatabaseUtils.user;
	private password: string = DatabaseUtils.password;

	connection: mysql.Connection | undefined;

	private constructor() {}

	public static async getInstance(): Promise<SingletonDB> {
		if (!SingletonDB.instance) {
			SingletonDB.instance = new SingletonDB();
		}

		await SingletonDB.instance.connect();

		return SingletonDB.instance;
	}

	async connect(): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				this.connection = mysql.createConnection({
					host: "localhost",
					user: this.user,
					password: this.password,
					database: SingletonDB.dbName,
				});

				this.connection.connect();

				resolve();
			} catch (e) {
				reject(e);
			}
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

	async addMany(product: Product): Promise<Product> {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < 100000; i++) {
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

	async addProduct(product: Product): Promise<Product> {
		return new Promise((resolve, reject) => {
			this.connection?.query(
				new QueryBuilder().insertInto(["ProductName", "Brand", "Material", "Color"], Object.values(product) as any, "Product").ExecuteQuery(),

				(error, results) => {
					if (error) {
						reject(error);
					}
					resolve(results);
				},
			);
		});
	}

	async updateProduct(product: Product): Promise<Product> {
		return new Promise((resolve, reject) => {
			this.connection?.query(
				new QueryBuilder().update("Product", Object.keys(product), Object.values(product) as any, "ProductId", product.ProductId.toString()).ExecuteQuery(),

				(error, _) => {
					if (error) {
						reject(error);
					}
					resolve(product);
				},
			);
		});
	}

	async deleteProduct(productId: Product): Promise<Product> {
		return new Promise((resolve, reject) => {
			this.connection?.query(
				new QueryBuilder().delete("Product", "ProductId", `${productId}`).ExecuteQuery(),

				(error, _) => {
					if (error) {
						reject(error);
					}
					resolve(productId);
				},
			);
		});
	}

	async getProduct(productId: string): Promise<Product> {
		return new Promise((resolve, reject) => {
			this.connection?.query(
				new QueryBuilder().select(["*"], "Product").where("ProductId", productId).ExecuteQuery(),

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
