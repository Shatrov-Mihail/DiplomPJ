import { ACTION_TYPE } from '../actions';

const initialProductState = {
	id: '',
	title: '',
	imageUrl: '',
	additionalImages: [],
	content: '',
	publishedAt: '',
	category: '',
	price: 0
};

export const productReducer = (state = initialProductState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_POST_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.RESET_POST_DATA:
			return initialProductState;
		default:
			return state;
	}
};
