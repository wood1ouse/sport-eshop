import { Product, Filter } from "./types";

export class ProductSpecification {
	constructor(private products: Array<Product>, private filter: Filter) {}

	private isSatisfiedBy(product: Product): boolean {
		for (const [filterKey, filterValue] of Object.entries(this.filter)) {
			for (const [productKey, productValue] of Object.entries(product)) {
				if (filterKey === productKey && filterValue == productValue) {
					return true;
				}
			}
		}
		return false;
	}

	public getSatisfiedBy(): Array<Product> {
		return this.products.filter(this.isSatisfiedBy.bind(this));
	}
}
