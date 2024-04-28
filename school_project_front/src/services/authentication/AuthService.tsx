import axios from "axios";
import LoginResponse from "../../types/LoginResponse.tsx";

class AuthService {
    private static instance: AuthService;
    private tokenKey = "authToken";

    private constructor() {}

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public login(email: string, password: string): Promise<void> {
        return axios
            .post("http://127.0.0.1:8000/api/login_check", {
                email: email,
                password: password
            })
            .then((response) => {
                const data: LoginResponse = response.data;
                localStorage.setItem(this.tokenKey, data.token);
            })
            .catch((error) => {
                console.error("Login failed:", error);
                throw error; // Rejette la promesse pour gérer les erreurs dans les composants
            });
    }

    public logout(): void {
        localStorage.removeItem(this.tokenKey);
    }

    public getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    public isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

export default AuthService;
