import { ACTION_TYPE } from '../actions';

const initialPostState = {
	id: '',
	title: '',
	imageUrl: '',
	additionalImages: [],
	content: '',
	publishedAt: '',
	comments: [],
	category: '',
	price: 0
};

export const postReducer = (state = initialPostState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_COMMENT:
			return {
				...state,
				comments: [
					...state.comments,
					action.payload
				]
			};
		case ACTION_TYPE.REMOVE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(comment => comment.id !== action.payload),
			};
		case ACTION_TYPE.SET_POST_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.RESET_POST_DATA:
			return initialPostState;
		default:
			return state;
	}
};
