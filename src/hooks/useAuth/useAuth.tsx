import { createContext, useState } from 'react';

interface AuthContextData {
    isLogged: boolean;
    setLogged: React.Dispatch<boolean>;
}

const AuthContext = createContext({} as AuthContextData);

const AuthContextProvider = ({ children }: any) => {
    const [isLogged, setLogged] = useState<boolean>(false);

    return (
        <AuthContext.Provider
            value={{
                isLogged,
                setLogged,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const AuthContextConsumer = AuthContext.Consumer;

export { AuthContext, AuthContextProvider, AuthContextConsumer };
