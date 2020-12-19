import { AuthService } from '../services/auth';

export default function Home() {
    const goToLogin = () => {
        AuthService.requestAccess();
    };

    return (
        <div className="md:flex bg-white rounded-lg p-24 justify-center">
            <button onClick={() => goToLogin()}>Login</button>
        </div>
    );
}
