export type Filter = {
	ProductId?: number;
	CategoryName?: string;
	SubcategoryName?: string;
	Brand?: string;
};

export type Product = {
	ProductId: number;
	ProductName: string;
	SubcategoryId: number;
	SubcategoryName: string;
	CategoryName: string;
	Brand: string;
	Price: number;
	Material: string | null;
	Color: string | null;
	Size: number | null;
	Discount: number;
	Amount: number;
	ProviderName: string;
};

export interface Query {
	selectBody: string;
	whereBody: string;
	innerJoinBody: string;
	orderBody: string;
	insertBody: string;
	updateBody: string;
	deleteBody: string;
	limitBody: string;
	offsetBody: string;
}

export interface ProductCartType {
	ProductId: number
}
