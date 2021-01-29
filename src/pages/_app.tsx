import type { AppProps } from 'next/app';
import { AuthContextConsumer, AuthContextProvider } from '../core/hooks/useAuth/useAuth';
import { SpotifyProvider } from '../core/hooks/useSpotifySDK/useSpotifySDK';

import '../core/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthContextProvider>
            <AuthContextConsumer>
                {({ isLogged }) => (
                    <SpotifyProvider>
                        <Component {...pageProps} />
                        {isLogged && <script src="https://sdk.scdn.co/spotify-player.js" />}
                    </SpotifyProvider>
                )}
            </AuthContextConsumer>
        </AuthContextProvider>
    );
}
