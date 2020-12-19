import React, { useEffect } from 'react';
import { AuthService } from '../../services/auth';

export default function LoginSuccess() {
    useEffect(() => {
        async function getAccessToken() {
            console.log(window.location.search);
            if (window.location.search) {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);

                console.log(queryString);

                if (urlParams.has('code')) {
                    const data = {
                        grant_type: 'authorization_code',
                        code: urlParams.get('code'),
                        redirect_uri: `${window.location.origin}${window.location.pathname}`,
                    };

                    try {
                        const res = await AuthService.getToken(data);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }
        getAccessToken();
    }, []);

    return <div>Login Success!</div>;
}
