"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function LoginPage() {
    const [mounted, setMounted] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setMessage("Login successful");
            router.push("/register");
        } catch (err: unknown) {
            const error = err as { code?: string; message?: string };

            console.error("Firebase Login Error:", error);
            if (error.code === "auth/user-not-found") {
                setMessage("No user found with this email.");
            } else if (error.code === "auth/wrong-password") {
                setMessage("Incorrect password.");
            } else if (error.code === "auth/invalid-email") {
                setMessage("Invalid email address.");
            } else {
                setMessage(error.message || "Login failed. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Welcome Back
                </h1>
                <p className="text-center text-gray-500 mt-1">
                    Please sign in to your account
                </p>

                <form onSubmit={handleLogin} className="mt-6 space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nethmi@example.com"
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                id="password"
                                type={passwordVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3"
                                required
                            />
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                onClick={() => setPasswordVisible((prev) => !prev)}
                            >
                                {passwordVisible ? (
                                    <FaEyeSlash className="text-gray-500" />
                                ) : (
                                    <FaEye className="text-gray-500" />
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-3 transition-colors"
                    >
                        Sign In
                    </button>
                </form>

                {message && (
                    <p className="text-center text-sm mt-4 text-red-500">{message}</p>
                )}

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <a
                        href="/register"
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
