import express from "express";
import { graphqlHTTP } from 'express-graphql';

import ShopFacade from "./ShopFacade";

import {schema, root} from "./graphql"

const PORT = 3000;

const app = express();

app.use(express.json())

app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true
}))

app.use(ShopFacade.initApp());


app.listen(PORT, () => {
	try {
		console.log(`Main server has started on port ${PORT}`);
	} catch (e) {
		console.log(e);
	}
});

