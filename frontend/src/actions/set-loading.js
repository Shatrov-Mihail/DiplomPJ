import { ACTION_TYPE } from './action-type';

export const setLoading = (isLoading) => ({
    type: ACTION_TYPE.SET_LOADING,
    payload: isLoading,
});
