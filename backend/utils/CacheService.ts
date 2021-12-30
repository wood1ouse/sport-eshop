import { Product } from "./types";
import NodeCache from "node-cache";
import { RequestHandler } from "express";

class CacheServie {
	private cache!: NodeCache;
	constructor() {
		this.cache = new NodeCache({ checkperiod: 60 * 60 * 24 });
	}

	verifyCache: RequestHandler = (req, res, next) => {
		try {
			if (req.url.includes("/providerproduct") && this.cache.has("providerproducts")) {
				const { ProductId } = req.params;

				const allProviderProducts: Array<Product> | undefined = this.cache.get("providerproducts");

				return res.status(200).json(
					allProviderProducts?.filter((product) => {
						return product.ProductId.toString() === ProductId;
					}),
				);
			}

			const cacheKey = Object.values(req.params)[0];

			if (this.cache.has(cacheKey)) {
				return res.status(200).json(this.cache.get(cacheKey));
			}

			return next();
		} catch (err) {
			return res.status(500).json(err);
		}
	};

	set(key: string, value: any) {
		this.cache.set(key, value);
	}

	get(key: string) {
		this.cache.get(key);
	}

	del(keys: string | string[]) {
		this.cache.del(keys);
	}

	flush() {
		this.cache.flushAll();
	}
}

export default new CacheServie();
