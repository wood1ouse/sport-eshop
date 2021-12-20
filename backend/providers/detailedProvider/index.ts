import express from "express";
import DetailedProviderController from "./DetailedProviderController";

const PORT = 3001;
const detailedProviderServer = express();

const detailedClientController = new DetailedProviderController();

detailedProviderServer.use(express.json())

detailedProviderServer.get("/price-list", detailedClientController.getPriceList);

detailedProviderServer.get("/details/:ProductId", detailedClientController.getDetailed);

detailedProviderServer.get("/getproducts", detailedClientController.getAll)

detailedProviderServer.get("/product/:page", detailedClientController.getProduct)

detailedProviderServer.post("/product", detailedClientController.addProduct)

detailedProviderServer.listen(PORT, () => {
	console.log(`Detailed Provider Server has started on port ${PORT}`);
});
