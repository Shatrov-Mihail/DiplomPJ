import { request } from '../utils/request';
import { setPostData } from './set-post-data';

export const savePostAsync = (id, newPostData) => async (dispatch) => {
	try {
		const saveRequest = id
			? request(`/posts/${id}`, 'PATCH', newPostData)
			: request('/posts', 'POST', newPostData);

		const response = await saveRequest;

		if (response.error) {
			throw new Error(response.error);
		}

		dispatch(setPostData(response.data));
		return response.data;
	} catch (error) {
		console.error('Error saving post:', error);
		throw error;
	}
};
