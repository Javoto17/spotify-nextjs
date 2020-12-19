import { HTTP } from '../http';

const NEXT_PUBLIC_CLIENT_ID: string = process.env.NEXT_PUBLIC_CLIENT_ID;
const NEXT_PUBLIC_REDIRECT_URI: string = process.env.NEXT_PUBLIC_REDIRECT_URI;
const NEXT_PUBLIC_CLIENT_SECRET: string = process.env.NEXT_PUBLIC_CLIENT_SECRET;

interface getTokenData {
    grant_type: string;
    code: string;
    redirect_uri: string;
}

export const AuthService = {
    requestAccess: () => {
        try {
            const scopes = ['streaming', 'user-read-email', 'user-read-private'].join('%20');
            const url = `https://accounts.spotify.com/authorize?client_id=${NEXT_PUBLIC_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
                NEXT_PUBLIC_REDIRECT_URI,
            )}&scope=${scopes}`;
            window.open(url);
        } catch (error) {
            console.log(error);
        }
    },
    getToken: (data: getTokenData) => {
        const body = Object.keys(data)
            .map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(`${data[key]}`);
            })
            .join('&');

        console.log(body);
        return HTTP.request(
            { url: 'api/token', type: 'POST', body },
            {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${NEXT_PUBLIC_CLIENT_ID}:${NEXT_PUBLIC_CLIENT_SECRET}`)}`,
            },
        );
    },
};
