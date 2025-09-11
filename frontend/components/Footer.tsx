"use client";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-800 py-8 border-t border-gray-200">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold text-indigo-700">Taxigo</h3>
                    <p className="text-sm opacity-80">
                        © {new Date().getFullYear()} Taxigo. All rights reserved.
                    </p>
                </div>
                <div className="flex gap-6 text-sm">
                    <Link href="/" className="hover:text-indigo-600">About</Link>
                    <Link href="/" className="hover:text-indigo-600">Contact</Link>
                    <Link href="/" className="hover:text-indigo-600">Terms</Link>
                </div>
                <div className="flex gap-4">
                    <Link href="/" className="text-gray-600 hover:text-indigo-600 transition">
                        <FaFacebookF size={18} />
                    </Link>
                    <Link href="/" className="text-gray-600 hover:text-indigo-600 transition">
                        <FaTwitter size={18} />
                    </Link>
                    <Link href="/" className="text-gray-600 hover:text-indigo-600 transition">
                        <FaInstagram size={18} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
