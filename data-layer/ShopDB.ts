import mysql from "mysql";

export default class ShopDB {
	static instance: ShopDB;
	static exists: boolean;

	constructor(
		public user: string,
		public password: string,
		public database: string,
	) {
		if (ShopDB.exists) {
			return ShopDB.instance;
		}
		ShopDB.instance = this;
		ShopDB.exists = true;
	}

	async connect(): Promise<string> {
		return new Promise((resolve, reject) => {
			try {
				mysql.createConnection({
					host: "localhost",
					user: this.user,
					password: this.password,
					database: this.database,
				}).connect()

                resolve("Connected Succesfully");
			} catch (e) {
				reject(e);
			}
			
		});
	}

}
