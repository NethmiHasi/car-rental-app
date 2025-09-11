"use client";

import { auth } from "@/lib/firebaseClient";
import { RootState } from "@/store";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const user = useSelector((state: RootState) => state.auth.user);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Logged out successfully!");
        } catch (error) {
            console.log(error);
        }
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Bookings", href: "/bookings" },
    ];

    return (
        <nav className="bg-white fixed w-full z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center relative">


                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-indigo-600">
                            Taxigo
                        </Link>
                    </div>


                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-900 hover:text-indigo-600 font-medium transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>


                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-gray-900 font-medium">
                                    Welcome, <span className="text-indigo-600">{user.displayName || user.email}</span>
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-900 hover:text-indigo-600 font-medium transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>


                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="text-gray-900 hover:text-indigo-600 focus:outline-none"
                        >
                            {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>


            <div className={`md:hidden bg-white shadow-sm transform transition-transform duration-300 ease-in-out ${mobileOpen ? "max-h-96" : "max-h-0 overflow-hidden"}`}>
                <div className="px-4 pt-4 pb-4 flex flex-col space-y-3 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="block text-gray-900 hover:text-indigo-600 font-medium transition py-2"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {user ? (
                        <>
                            <span className="text-gray-900 font-medium text-center">
                                Welcome, <span className="text-indigo-600">{user.displayName || user.email}</span>
                            </span>
                            <button
                                onClick={() => { handleLogout(); setMobileOpen(false); }}
                                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-gray-900 hover:text-indigo-600 font-medium transition py-2"
                                onClick={() => setMobileOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                                onClick={() => setMobileOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
