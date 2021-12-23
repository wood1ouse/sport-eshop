import express from "express";
import FilteredProviderController from "./FilteredProviderController";

const PORT = 3002;
const filteredProviderServer = express();

const filteredClientController = new FilteredProviderController();

filteredProviderServer.get("/search", filteredClientController.filterBy);

filteredProviderServer.get("/getproducts", filteredClientController.getAll);

filteredProviderServer.get("/product/:ProductId", filteredClientController.getProduct);

filteredProviderServer.listen(PORT, () => {
	console.log(`Filtered Provider Server has started on port ${PORT}`);
});
