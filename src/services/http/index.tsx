import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

const BASE_URL: string = 'https://accounts.spotify.com/';

export interface ApiRequest {
    type: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
    url: string;
    body?: any;
    map?: any;
    pipe?: any;
}

export const HTTP = {
    request: (request: ApiRequest, headers) => {
        const $ob = from(
            fetch(`${BASE_URL}${request.url}`, {
                method: request.type,
                headers: headers,
                body: request.body instanceof Object ? JSON.stringify(request.body) : (request.body as string),
            }),
        ).pipe(
            mergeMap((res) => {
                return new Promise(async (resolve) => {
                    resolve({ status: res.status, data: await res.json() });
                });
            }),
        );
        if (request.pipe) {
            return $ob.pipe(request.pipe);
        }

        return $ob;
    },
};
