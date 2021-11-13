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
};

export interface Query {
	selectBody: string,
	innerJoinBody: string
}