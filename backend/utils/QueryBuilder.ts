import { Query } from "./types";

export class QueryBuilder {
	private readonly _query: Query;

	constructor() {
		this._query = {
			selectBody: "",
			innerJoinBody: "",
			orderBody: "",
			insertBody: "",
			updateBody: "",
			deleteBody: "",
		};
	}

	public select(queries: Array<String>, table: string): QueryBuilder {
		this._query.selectBody += `SELECT ${queries.join(", ")} FROM ${table}`;
		return this;
	}

	public innerJoin(table: string, left: string, right: string): QueryBuilder {
		this._query.innerJoinBody += `INNER JOIN ${table} ON ${left} = ${right}\n`;
		return this;
	}

	public orderBy(field: string): QueryBuilder {
		this._query.orderBody += `ORDER BY ${field}`;
		return this;
	}

	public insertInto(
		columns: Array<string>,
		values: Array<string>,
		table: string,
	): QueryBuilder {
		this._query.insertBody += `INSERT INTO ${table} (${columns.join(
			", ",
		)}) VALUES (${values.map(column => `'${column}'`).join(", ")})`;
		return this;
	}

	public update(table:string, columns: Array<string>, values: Array<string>, filterKey: string, filterValue: string): QueryBuilder {
		let columnsBody = 'SET '
		columns.forEach((column, idx) => {
			if (column !== filterKey) {
				if (idx === columns.length - 1) {
					columnsBody += `${column} = '${values[idx]}'`
				} else {
					columnsBody += `${column} = '${values[idx]}', `
				}
			}
			
		})
		this._query.updateBody += `UPDATE ${table} ${columnsBody} WHERE ${filterKey} = ${filterValue}`
		return this
	}

	public delete(table: string, filterKey: string, filterValue: string): QueryBuilder {
		this._query.deleteBody += `DELETE FROM ${table} WHERE ${filterKey} = ${filterValue}`
		return this
	}


	public ExecuteQuery(): string {
		return Object.values(this._query).join("\n");
	}

}


// INSERT INTO SportShopDB.Product (ProductName, SubcategoryId, Brand, Price, Material, Color, Size, Discount, Amount,
// 	Image)
// VALUES (null, 2, 'adasd', 123123, null, 'asdas', 2433, 342, 423, null);