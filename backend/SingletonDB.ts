import mysql from "mysql";
import DatabaseUtils from "../Utils";
import { QueryBuilder } from "./providers/utils/QueryBuilder";
import { Product } from "./providers/utils/types";

export default class SingletonDB {
	static instance: SingletonDB;
	private user: string = DatabaseUtils.user;
	private password: string = DatabaseUtils.password;

	connection: mysql.Connection | undefined;

	private constructor() {}

	public static getInstance(): SingletonDB {
		if (!SingletonDB.instance) {
			SingletonDB.instance = new SingletonDB();
		}

		return SingletonDB.instance;
	}

	async connect(database: string): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				this.connection = mysql.createConnection({
					host: "localhost",
					user: this.user,
					password: this.password,
					database,
				});

				this.connection.connect();

				resolve();
			} catch (e) {
				reject(e);
			}
		});
	}

	async getAllCombined(
		database: string = "FilteredProvider",
	): Promise<Array<Product>> {
		this.connect(database);

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
						`${database}.Product`,
					)
					.innerJoin(
						`${database}.Subcategory`,
						"Product.SubcategoryId",
						"Subcategory.SubcategoryId",
					)
					.innerJoin(
						`${database}.Category`,
						"Product.SubcategoryId",
						"Category.SubcategoryId",
					)
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
