"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroSection() {
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();

    return (
        <section className="relative bg-gradient-to-r from-indigo-100 via-amber-50 to-white py-12 overflow-hidden">
            <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center px-6 lg:px-0 gap-6">
                <div className="lg:w-1/2 text-center lg:text-left space-y-6 lg:pl-12">
                    <h1 className="text-4xl lg:text-5xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-400 animate-slideIn">
                        Drive Your Dream
                    </h1>
                    <p className="text-lg lg:text-xl  text-gray-700 leading-relaxed animate-slideIn200">
                        Explore our premium collection of cars, designed for style, comfort,
                        and unforgettable adventures. Your perfect ride awaits!
                    </p>
                    <button
                        onClick={() => router.push(user ? "/booking" : "/login")}
                        className="bg-indigo-600  text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition animate-slideIn400"
                    >
                        Start Booking
                    </button>
                </div>

                <div className="lg:w-1/2 relative w-full h-56 lg:h-80">
                    <div className="absolute -top-4 -right-4 w-80 h-52 lg:w-[28rem] lg:h-80 bg-white rounded-3xl shadow-2xl transform rotate-3"></div>
                    <Image
                        src="/hero.png"
                        alt="Featured Car"
                        fill
                        className="object-contain relative z-10"
                    />
                </div>
            </div>
        </section>
    );
}
