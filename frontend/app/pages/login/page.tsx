"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");

        const res = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            const { token } = await res.json();
            localStorage.setItem("token", token);
            router.push("/pages/admin");
        } else {
            setError("Login falhou. Verifique suas credenciais");
        }
    };

    return (
        <div className="flex items-center justify-center p-14">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-bold mb-4 text-black">Login</h1>
                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded text-gray-600"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded text-gray-600"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
