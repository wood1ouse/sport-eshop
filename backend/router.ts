import express from "express";
import { Router } from "express";
import ShopController from './ShopController';


const router = new (Router as any)();

router.get('/', ShopController.combineData)

router.get("/search", (req: express.Request, res: express.Response) => {
    res.status(200).json(req.query)
}); 

router.get("/price-list", ShopController.getPriceList);

router.get("/details/:id", ShopController.getDetailed);

export default router;
