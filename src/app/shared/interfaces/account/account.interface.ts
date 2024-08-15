import { IProductsResponse } from "../product/product.interface";

export interface ILogin {
    email: string;
    password: string;
}
export interface IUser {
    address: any[];
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
}
export interface IUserFullRequest extends IUser {
    street: string,
    house: string,
    flat: string,
    entrance: string,
    floor: string,
    intercom: string,
    orders: IProductsResponse[];
}