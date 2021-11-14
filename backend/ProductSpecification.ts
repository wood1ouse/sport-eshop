import { Product, Filter } from "./types";

export class ProductSpecification {
	constructor(private products: Array<Product>, private filter: Filter) {}

	private isSatisfiedBy(product: Product): boolean {
		for (const filterprop of Object.values(this.filter)) {
			for (const productprop of Object.values(product)) {
				if (filterprop == productprop) {
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
