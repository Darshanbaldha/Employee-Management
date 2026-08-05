import { useState } from "react";
import api from "../api/employeeApi";

type LoginProps = {
    setIsLoggedIn: (value: boolean) => void;
};

export function Login({ setIsLoggedIn }: LoginProps) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setError("");

            // send data
            const res = await api.post("/auth/login", { email, password });
            // store token in local storage.
            localStorage.setItem("token", res.data.token);

            // set logedin usestate true.
            setIsLoggedIn(true);

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Login failed.");
            }
        }
    };

    return (
        <section className="mx-auto mt-20 max-w-md rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-5 text-xl font-semibold">
                Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-4" >

                <label htmlFor="email">Enter Email</label>
                <input type="email" placeholder="Email" className="w-full rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Enter Password</label>
                <input type="password" placeholder="Password" className="w-full rounded border p-2" value={password} onChange={(e) => setPassword(e.target.value)} />

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

                <button className="w-full rounded bg-indigo-600 py-2 text-white" >
                    Login
                </button>
            </form>
        </section>
    );
}