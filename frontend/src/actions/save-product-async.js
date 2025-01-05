import { request } from '../utils/request';
import { setProductData } from './set-product-data';

export const saveProductAsync = (id, newProductData) => async (dispatch) => {
	try {
		const formattedData = {
			...newProductData,
			price: Number(newProductData.price),
			category: String(newProductData.category),
		};

		const saveRequest = id
			? request(`/productsList/${id}`, 'PATCH', formattedData)
			: request('/productsList', 'POST', formattedData);

		const response = await saveRequest;

		if (response.error) {
			throw new Error(response.error);
		}

		dispatch(setProductData(response.data));
		return response.data;
	} catch (error) {
		console.error('Error saving product:', error);
		throw error;
	}
};
