import { useState } from "react"
import api from "../api/employeeApi";
import { Link } from "react-router-dom";

type LoginProps = {
    setIsLoggedIn: (value: boolean) => void;
};

export function Signup({ setIsLoggedIn }: LoginProps) {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("employee");
    const [error, setError] = useState("");

    const handleFunction = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setError("");

            // send data
            const res = await api.post("/auth/register", { name, email, password, role });
            // store token in local storage.
            localStorage.setItem("token", res.data.token);

            setName("");
            setEmail("");
            setPassword("");
            setRole("employee")

            // set logedin usestate true.
            setIsLoggedIn(true);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Login failed.");
            }
        }
    }
    return (
        <section className="mx-auto mt-20 max-w-md rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-5 text-xl font-semibold">
                Signup
            </h2>

            <form onSubmit={handleFunction} className="space-y-4" >

                <label htmlFor="name">Enter Name</label>
                <input type="text" placeholder="name" className="w-full rounded border p-2" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="email">Enter Email</label>
                <input type="email" placeholder="Email" className="w-full rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Enter Password</label>
                <input type="password" placeholder="Password" className="w-full rounded border p-2" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="role">Enter Role</label>
                <select className="w-full rounded border p-2" value={role} onChange={(e) => setRole(e.target.value)} >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select>

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

                <button className="w-full rounded bg-indigo-600 py-2 text-white" >
                    Sign up
                </button>

                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 hover:underline"> Login </Link>
                </p>
            </form>
        </section>
    );
}