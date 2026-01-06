import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure Axios
    const api = axios.create({
        baseURL: "http://localhost:8000",
    });

    // Attach token to requests
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await api.get("/users/me");
                // Enrich user from DB response
                setUser(response.data);
            } catch (error) {
                console.error("Session invalid", error);
                localStorage.removeItem("token");
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        // FastAPI expects form-data for OAuth2 spec, not JSON
        const formData = new FormData();
        formData.append("username", email);
        formData.append("password", password);

        const response = await api.post("/login", formData);
        const { access_token } = response.data;

        localStorage.setItem("token", access_token);
        await checkUser();
    };

    const register = async (name, email, password) => {
        await api.post("/register", { name, email, password });
        await login(email, password); // Auto-login after register
    };

    const updateProfile = async (profileString) => {
        try {
            const response = await api.put(`/users/me/profile?profile=${profileString}`);
            setUser(response.data);
        } catch (error) {
            console.error("Failed to update profile", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, setUser, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
