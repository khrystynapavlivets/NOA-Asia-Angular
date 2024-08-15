import { ICategoryResponse } from "../category/category.interface";

export interface IProductsRequest {
	category: ICategoryResponse;
	name: string;
	path: string;
	description: string;
	weight: string;
	price: number;
	imagePath: string;
	count: number;
	favorites?: boolean;
}

export interface IProductsResponse extends IProductsRequest {
    id:  number | string;
}