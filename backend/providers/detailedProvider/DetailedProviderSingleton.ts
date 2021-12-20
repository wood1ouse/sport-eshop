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
				new QueryBuilder()
					.select(
						[
							"Product.ProductId",
							"Product.ProductName",
							"Product.Brand",
							"Product.Price",
							"Product.Material",
							"Product.Color",
							"Product.Size",
							"Product.Discount",
							"Product.Amount",
							"Subcategory.SubcategoryName",
							"Category.CategoryName",
						],
						`${DetailedProviderSingleton.dbName}.Product`,
					)
					.innerJoin(`${DetailedProviderSingleton.dbName}.Subcategory`, "Product.SubcategoryId", "Subcategory.SubcategoryId")
					.innerJoin(`${DetailedProviderSingleton.dbName}.Category`, "Product.SubcategoryId", "Category.SubcategoryId")
					.orderBy("ProductId")

					.ExecuteQuery(),

				(error, results) => {
					if (error) {
						reject(error);
					}
					resolve(results);
				},
			);
		});
	}
}
