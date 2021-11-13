import express from "express";
import router from "./router";
import SingletonDB from "./SingletonDB";

const PORT: number = 3000;

const app = express();

export const db = SingletonDB.getInstance();

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
	

	try {
		console.log(`Server has started on port ${PORT}`);

	} catch (e) {
		console.log(e);
	}

});



