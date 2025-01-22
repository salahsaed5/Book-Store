export type ViewMode = "grid" | "list";
export type SortOption =
	| "Alphabetically, A-Z"
	| "Alphabetically, Z-A"
	| "Price, low to high"
	| "Price, high to low";

export interface Book {
	_id: string;
	_v: string;
	name: string;
	description: string;
	author: string;
	image: string;
	price: number;
	status: string;
	category: string;
	updatedAt: string;
	createdAt: string;
}
