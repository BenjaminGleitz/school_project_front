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

    public register(email: string, password: string, firstname: string, lastname: string, favoriteCityId: number | null, nationality: string, birthdate: string, gender: string): Promise<void> {
        console.log(favoriteCityId);
        return axios
            .post("https://toogether.uno/userRegister", {
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname,
                favoriteCity: favoriteCityId,
                nationality: nationality,
                birthdate: birthdate,
                gender: gender
            })
            .then((response) => {
                console.log("User registered:", response);
            })
            .catch((error) => {
                console.error("Registration failed:", error);
                throw error; // Rejette la promesse pour gérer les erreurs dans les composants
            });
    }

    public login(email: string, password: string): Promise<void> {
        return axios
            .post("https://toogether.uno/api/login_check", {
                email: email,
                password: password
            })
            .then((response) => {
                const data: LoginResponse = response.data;
                localStorage.setItem(this.tokenKey, data.token);
            })
            .catch((error) => {
                console.error("Login failed:", error);
                throw error;
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
