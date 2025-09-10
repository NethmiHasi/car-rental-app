"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "@/lib/firebaseClient";
import { doc, setDoc } from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
    const [mounted, setMounted] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const validatePassword = (password: string) => {
        const minLength = /.{8,}/;
        const upper = /[A-Z]/;
        const lower = /[a-z]/;
        const number = /[0-9]/;
        const special = /[!@#$%^&*(),.?":{}|<>]/;

        if (!minLength.test(password)) return "Password must be at least 8 characters";
        if (!upper.test(password)) return "Password must include at least one uppercase letter";
        if (!lower.test(password)) return "Password must include at least one lowercase letter";
        if (!number.test(password)) return "Password must include at least one number";
        if (!special.test(password)) return "Password must include at least one special character";

        return "";
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const passwordError = validatePassword(password);
        if(passwordError){
            setMessage(passwordError);
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await setDoc(doc(db, "users", userCredential.user.uid), {
                name,
                email,
                phone,
                createdAt: new Date(),
            });

            setMessage("Account created successfully!");
            router.push("/");
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Create Account
                </h1>
                <p className="text-center text-gray-500 mt-1">
                    Please fill in the details to sign up
                </p>

                <form onSubmit={handleRegister} className="mt-6 space-y-5">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3"
                            required
                        />
                    </div>

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

                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            type="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="xxxxxxxxxx"
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-3 transition-colors"
                    >
                        Sign Up
                    </button>
                </form>

                {message && (
                    <p className="text-center text-sm mt-4 text-red-500">{message}</p>
                )}

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
