import express from "express";
import router from "./router";
import ShopDB from "./ShopDB";
import DatabaseUtils from "../Utils";

const PORT: number = 3000;

const app = express();

app.use(express.json());

app.use(router);

app.listen(PORT, async () => {
	const shopDb = new ShopDB(
		DatabaseUtils.user,
		DatabaseUtils.password,
		DatabaseUtils.database,
	);

	try {
		const isConnected = await shopDb.connect();
		console.log(isConnected);
		console.log("server has started");
        
	} catch (e) {
		console.log(e);
	}
});
