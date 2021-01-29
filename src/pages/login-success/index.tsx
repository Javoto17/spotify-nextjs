import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useAuth } from '../../core/hooks/useAuth/useAuth';
import { AuthService } from '../../core/services/auth';

export default function LoginSuccess() {
    const { saveToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        async function getAccessToken() {
            if (window.location.search) {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);

                if (urlParams.has('code')) {
                    const data = {
                        grant_type: 'authorization_code',
                        code: urlParams.get('code'),
                        redirect_uri: `${window.location.origin}${window.location.pathname}`,
                    };

                    try {
                        const { access_token } = await AuthService.getToken(data);
                        saveToken(access_token);

                        setTimeout(() => {
                            router.push('/');
                        }, 1500);
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
