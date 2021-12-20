import mysql from "mysql";
import DatabaseUtils from "../../../Utils";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Product } from "../../utils/types";

export default class FilteredProviderSingleton {
	static instance: FilteredProviderSingleton;
	static dbName: string = "FilteredProvider";
	private user: string = DatabaseUtils.user;
	private password: string = DatabaseUtils.password;

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
						`${FilteredProviderSingleton.dbName}.Product`,
					)
					.innerJoin(`${FilteredProviderSingleton.dbName}.Subcategory`, "Product.SubcategoryId", "Subcategory.SubcategoryId")
					.innerJoin(`${FilteredProviderSingleton.dbName}.Category`, "Product.SubcategoryId", "Category.SubcategoryId")
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
