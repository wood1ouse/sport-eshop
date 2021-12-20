import NodeCache from "node-cache";

export default class Cache {
	private cache!: NodeCache;
	constructor(ttlSeconds: number) {
		this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
	}

	async get(key: string, storeFunction: () => Promise<any>) {
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