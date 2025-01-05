import { request } from "../utils/request";

export const removePostAsync = (id) => () =>
	request(`/productsList/${id}`, 'DELETE');
