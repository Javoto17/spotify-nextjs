import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../hooks/useAuth/useAuth';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if (window) {
            (window as any).onSpotifyWebPlaybackSDKReady = () => {
                const token =
                    'BQDtwTEjG5X74udkifix7BkhQsdmbBkOw7QRhLHN5BpueQNu8OwB9_iQ94onDb090-ugj1d6Izyd0ESu1JVey12WsEVDuP19itxaLAL4Bt9m9EQqfNZWBvb96KOtHRDO3PE1Xg5mJFVFuMCv-oez1FQGhhwLcvUwqw';
                const player = new Spotify.Player({
                    name: 'Nextjs Spotify',
                    getOAuthToken: (cb) => {
                        console.log(cb);
                        cb(token);
                    },
                });

                console.log(player);

                // Error handling
                player.addListener('initialization_error', ({ message }) => {
                    console.error(message);
                });
                player.addListener('authentication_error', ({ message }) => {
                    console.error(message);
                    console.log('hola');
                });
                player.addListener('account_error', ({ message }) => {
                    console.error(message);
                });
                player.addListener('playback_error', ({ message }) => {
                    console.error(message);
                });

                // Playback status updates
                player.addListener('player_state_changed', (state) => {
                    console.log(state);
                });

                // Ready
                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                });

                // Not Ready
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                // Connect to the player!
                player.connect();
            };
        }
    }, []);

    return (
        <AuthContextProvider>
            <Component {...pageProps} />
            <script src="https://sdk.scdn.co/spotify-player.js" />
        </AuthContextProvider>
    );
}
