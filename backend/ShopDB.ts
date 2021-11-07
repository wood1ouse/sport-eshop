import mysql from "mysql";
import DatabaseUtils from "../Utils";

export default class SingletonDB {
	static instance: SingletonDB;
	private user: string = DatabaseUtils.user;
	private password: string = DatabaseUtils.password;

	connection: mysql.Connection | undefined;

	constructor() {}

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

	async getAll(database: string): Promise<Array<object>> {
		return new Promise((resolve, reject) => {
			this.connection?.query(
				`SELECT ProductId, ProductName, SubcategoryId, Brand, Price, Material, Color, Size, Discount, Amount FROM ${database}.Product`,
				(error, results) => {
					if (error) {
						reject(error);
					}
					resolve(results);
				},
			);
		});
	}

	async getPriceList(table: string): Promise<Array<object>> {
		return new Promise((resolve, reject) => {
			this.connection?.query(
				`SELECT ProductName, Price FROM ${table}`,
				(error, results) => {
					if (error) {
						reject(error);
					}
					resolve(results);
				},
			);
		});
	}

	async getDetailed(id: any): Promise<Array<object>> {
		return new Promise((resolve, reject) => {
			this.connection?.query(
				`SELECT ProductId, ProductName, SubcategoryId, Brand, Price, Material, Color, Size, Discount, Amount FROM Product WHERE ProductId = ${id}`,
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

// Singleton +
// Builder +
// ...
