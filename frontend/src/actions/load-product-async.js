import { request } from '../utils/request';
import { setProductData } from './set-product-data';

export const loadProductAsync = (productId) => (dispatch) =>
	request(`/productsList/${productId}`).then((productData) => {
		if (productData.data) {
			dispatch(setProductData(productData.data));
		}

		return productData;
	});
