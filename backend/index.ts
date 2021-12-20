import express from "express";

import bodyParser from 'body-parser';

import ShopFacade from "./ShopFacade";

const PORT = 3000;

const app = express();

app.use(express.json())

app.use(ShopFacade.initApp());


app.listen(PORT, () => {
	try {
		console.log(`Main server has started on port ${PORT}`);
	} catch (e) {
		console.log(e);
	}
});

