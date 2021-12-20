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

		this.router.post("/product", this.shopController.addProduct);

		this.router.put("/product", this.shopController.updateProduct);

		this.router.delete("/product", this.shopController.deleteProduct);

		this.router.get("/product/:ProductId", this.shopController.getProduct)

		return this.router
	}
}

export default new ShopFacade()