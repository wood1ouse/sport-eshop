import { Router } from "express";
import cache from './utils/CacheService';
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

		this.router.post("/product/many", this.shopController.addMany);

		this.router.post("/product/", this.shopController.addProduct);

		this.router.put("/product", this.shopController.updateProduct);

		this.router.delete("/product", this.shopController.deleteProduct);

		this.router.get("/providerpage/:page", cache.verifyCache, this.shopController.getProviderPage)

		this.router.get("/providerproduct/:ProductId", cache.verifyCache, this.shopController.getProviderProduct)
		
		this.router.get("/product/:ProductId", this.shopController.getProduct)

		return this.router
	}
}

export default new ShopFacade()