import { Query } from "./types";

export class QueryBuilder {
	private readonly _query: Query;

	constructor() {
		this._query = {
			selectBody: "",
			innerJoinBody: "",
		};
	}

	public ExecuteQuery(): string {
		return Object.values(this._query).join("\n")
	}

	public select(queries: Array<String>, table: string): QueryBuilder {
		this._query.selectBody += `SELECT ${queries.join(", ")} FROM ${table}`;
		return this;
	}

	public innerJoin(table: string, left: string, right: string): QueryBuilder {
		this._query.innerJoinBody += `INNER JOIN ${table} ON ${left} = ${right}\n`;
		return this;
	}
}