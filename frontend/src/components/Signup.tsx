// import { useState } from "react"
// import api from "../api/employeeApi";
// import { Link } from "react-router-dom";

// type LoginProps = {
//     setIsLoggedIn: (value: boolean) => void;
// };

// export function Signup({ setIsLoggedIn }: LoginProps) {
//     const [name, setName] = useState<string>("");
//     const [email, setEmail] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//     const [role, setRole] = useState<string>("employee");
//     const [error, setError] = useState("");

//     const handleFunction = async (e: React.FormEvent) => {
//         e.preventDefault();

//         try {
//             setError("");

//             // send data
//             const res = await api.post("/auth/register", { name, email, password, role });
//             // store token in local storage.
//             localStorage.setItem("token", res.data.token);

//             setName("");
//             setEmail("");
//             setPassword("");
//             setRole("employee")

//             // set logedin usestate true.
//             setIsLoggedIn(true);
//         } catch (error: unknown) {
//             if (error instanceof Error) {
//                 setError(error.message);
//             } else {
//                 setError("Login failed.");
//             }
//         }
//     }
//     return (
//         <section className="mx-auto mt-20 max-w-md rounded-xl bg-white p-6 shadow-lg">
//             <h2 className="mb-5 text-xl font-semibold">
//                 Signup
//             </h2>

//             <form onSubmit={handleFunction} className="space-y-4" >

//                 <label htmlFor="name">Enter Name</label>
//                 <input type="text" placeholder="name" className="w-full rounded border p-2" value={name} onChange={(e) => setName(e.target.value)} />

//                 <label htmlFor="email">Enter Email</label>
//                 <input type="email" placeholder="Email" className="w-full rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} />

//                 <label htmlFor="password">Enter Password</label>
//                 <input type="password" placeholder="Password" className="w-full rounded border p-2" value={password} onChange={(e) => setPassword(e.target.value)} />

//                 <label htmlFor="role">Enter Role</label>
//                 <select className="w-full rounded border p-2" value={role} onChange={(e) => setRole(e.target.value)} >
//                     <option value="employee">Employee</option>
//                     <option value="admin">Admin</option>
//                 </select>

//                 {error && (
//                     <p className="text-red-500">
//                         {error}
//                     </p>
//                 )}

//                 <button className="w-full rounded bg-indigo-600 py-2 text-white" >
//                     Sign up
//                 </button>

//                 <p className="mt-4 text-center">
//                     Already have an account?{" "}
//                     <Link to="/login" className="text-indigo-600 hover:underline"> Login </Link>
//                 </p>
//             </form>
//         </section>
//     );
// }

import { useState } from "react";
import api from "../api/employeeApi";
import { Link } from "react-router-dom";

type LoginProps = {
    setIsLoggedIn: (value: boolean) => void;
};

export function Signup({ setIsLoggedIn }: LoginProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("employee");
    const [error, setError] = useState("");

    const handleFunction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setError("");

            // Send data
            const res = await api.post("/auth/register", {
                name,
                email,
                password,
                role
            });

            // Store token in local storage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);

            setName("");
            setEmail("");
            setPassword("");
            setRole("employee");

            // Set logged in state
            setIsLoggedIn(true);

        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Signup failed.");
            }
        }
    };

    return (
        <section className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">

                <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">

                    {/* Header */}
                    <div className="mb-7 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white shadow-md shadow-indigo-200">
                            E
                        </div>

                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                            Create Account
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Create an account to access the employee directory.
                        </p>
                    </div>

                    <form onSubmit={handleFunction} className="space-y-5" >

                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700" >
                                Full Name
                            </label>

                            <input type="text" id="name" placeholder="Enter your name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700" >
                                Email
                            </label>

                            <input type="email" id="email" placeholder="Enter your email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700" >
                                Password
                            </label>

                            <input type="password" id="password" placeholder="Create a password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
                        </div>

                        {/* Role */}
                        <div>
                            <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-slate-700" >
                                Role
                            </label>

                            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" >
                                <option value="employee">
                                    Employee
                                </option>

                                <option value="admin">
                                    Admin
                                </option>
                            </select>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Button */}
                        <button type="submit" className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.99]" >
                            Sign Up
                        </button>

                        {/* Login link */}
                        <p className="pt-2 text-center text-sm text-slate-500">
                            Already have an account?{" "}
                                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline" >
                                    Login
                                </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}