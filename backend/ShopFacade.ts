import { Router } from "express";
import ShopController from "./ShopController";

class ShopFacade {
	router: Router;
	shopController: ShopController;
	constructor() {
		this.router = new (Router as any)();
		this.shopController = new ShopController();
	}

	initApp(): Router {
		this.router.get("/", this.shopController.combineData);

		this.router.get("/search", this.shopController.filterBy);

		this.router.get("/price-list", this.shopController.getPriceList);

		this.router.get("/details/:ProductId", this.shopController.getDetailed);

		return this.router
	}
}

export default new ShopFacade()