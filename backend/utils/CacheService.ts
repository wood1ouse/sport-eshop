import { Product } from './types';
import NodeCache from "node-cache";

export default class CacheServie {
	private cache!: NodeCache;
	constructor() {
		this.cache = new NodeCache({ checkperiod: 60 * 60 * 24});
	}

	set(key: string, value: any) {
		this.cache.set(key, value)
	}

	async get(key: string, storeFunction: () => Promise<Product> | Promise<Product[]>) {
		const value = this.cache.get(key);
		if (value) {
			return Promise.resolve(value);
		}

		const result = await storeFunction();
		this.cache.set(key, result);
		return result;
	}

	del(keys: string | string[]) {
		this.cache.del(keys);
	}

	flush() {
		this.cache.flushAll();
	}
}