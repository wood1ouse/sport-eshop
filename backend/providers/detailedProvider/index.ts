import express from "express";
import DetailedProviderController from "./DetailedProviderController";

const PORT = 3001;
const detailedProviderServer = express();

const detailedClientController = new DetailedProviderController();

detailedProviderServer.get("/price-list", detailedClientController.getPriceList);

detailedProviderServer.get("/details/:ProductId", detailedClientController.getDetailed);

detailedProviderServer.get("/getproducts", detailedClientController.getAll)

detailedProviderServer.listen(PORT, () => {
	console.log(`Detailed Provider Server has started on port ${PORT}`);
});
