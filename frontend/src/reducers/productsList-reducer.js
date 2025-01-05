import { ACTION_TYPE } from '../actions';

const initialProductsListState = {
	productsList: [],
	lastPage: 1
};

export const productsListReducer = (state = initialProductsListState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_POST_DATA:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
};
