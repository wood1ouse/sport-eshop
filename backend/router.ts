import { Router } from "express";
import ShopFacade from './ShopFacade';


const router = new (Router as any)();

router.get('/', ShopFacade.combineData)

router.get("/search", ShopFacade.filterBy); 

router.get("/price-list", ShopFacade.getPriceList);

router.get("/details/:ProductId", ShopFacade.getDetailed);

export default router;
