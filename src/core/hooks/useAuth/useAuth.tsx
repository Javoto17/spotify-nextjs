import { createContext, useState, useEffect, useContext } from 'react';
import { StorageService } from '../../services/storage';

interface AuthContextData {
    isLogged: boolean;
    clearToken: () => void;
    saveToken: (token: string) => void;
    isLoading: boolean;
}

const AuthContext = createContext({} as AuthContextData);

const AuthContextProvider = ({ children }: any) => {
    const [isLogged, setLogged] = useState<boolean>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        async function checkToken() {
            try {
                const res = await StorageService.getItem('token');
                if (res) {
                    setLogged(true);
                }
            } catch (error) {
                setLoading(false);
            }
        }
        checkToken();
    }, []);

    const saveToken = async (token: string) => {
        try {
            await StorageService.setItem('authToken', token);
            setLogged(true);
        } catch (error) {}
    };

    const clearToken = async () => {
        StorageService.removeItem('authToken');
        setLogged(false);
    };

    return (
        <AuthContext.Provider
            value={{
                saveToken,
                isLogged,
                clearToken,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const AuthContextConsumer = AuthContext.Consumer;

export { AuthContext, AuthContextProvider, AuthContextConsumer };

export function useAuth() {
    return useContext(AuthContext);
}
