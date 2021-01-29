import { createContext, useRef, useEffect, ReactNode } from 'react';

const SpotifyContext = createContext({});

const SpotifyProvider = ({ children }: any) => {
    const player = useRef(null);

    useEffect(() => {
        if (window) {
            (window as any).onSpotifyWebPlaybackSDKReady = () => {
                const token =
                    'BQDtwTEjG5X74udkifix7BkhQsdmbBkOw7QRhLHN5BpueQNu8OwB9_iQ94onDb090-ugj1d6Izyd0ESu1JVey12WsEVDuP19itxaLAL4Bt9m9EQqfNZWBvb96KOtHRDO3PE1Xg5mJFVFuMCv-oez1FQGhhwLcvUwqw';

                player.current = new Spotify.Player({
                    name: 'Nextjs Spotify',
                    getOAuthToken: (cb) => {
                        console.log(cb);
                        cb(token);
                    },
                });

                console.log(player);

                // Error handling
                player.current.addListener('initialization_error', ({ message }) => {
                    console.error(message);
                });
                player.current.addListener('authentication_error', ({ message }) => {
                    console.error(message);
                });
                player.current.addListener('account_error', ({ message }) => {
                    console.error(message);
                });
                player.current.addListener('playback_error', ({ message }) => {
                    console.error(message);
                });

                // Playback status updates
                player.current.addListener('player_state_changed', (state) => {
                    console.log(state);
                });

                // Ready
                player.current.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                });

                // Not Ready
                player.current.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                // Connect to the player.current !
                player.current.connect();
            };
        }
    }, []);

    return (
        <SpotifyContext.Provider
            value={{
                player: player.current,
            }}
        >
            {children}
        </SpotifyContext.Provider>
    );
};

const SpotifyConsumer = SpotifyContext.Consumer;

export { SpotifyContext, SpotifyProvider, SpotifyConsumer };
