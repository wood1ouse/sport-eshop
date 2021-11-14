import express from "express";
import SingletonDB from "./SingletonDB";
import ShopFacade from "./ShopFacade";

const PORT: number = 3000;

const app = express();

app.use(express.json());

app.use(ShopFacade.initApp());

app.listen(PORT, () => {
	try {
		console.log(`Server has started on port ${PORT}`);
	} catch (e) {
		console.log(e);
	}
});
