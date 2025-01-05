import { store } from '../store';
import { setLoading } from '../actions';

export function request(url, method, data) {
    store.dispatch(setLoading(true));

    return fetch(url, {
        headers: {
            'content-type': 'application/json'
        },
        method: method || 'GET',
        body: data ? JSON.stringify(data) : undefined,
    })
    .then(res => res.json())
    .finally(() => {
        store.dispatch(setLoading(false));
    });
}
