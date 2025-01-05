import { ACTION_TYPE } from '../actions';

const initialLoadingState = {
    isLoading: false
};

export const loadingReducer = (state = initialLoadingState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
};
