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
		
		return this.router
	}
}

export default new ShopFacade()