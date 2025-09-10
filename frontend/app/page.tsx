"use client";

import { Navbar } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

interface Car {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const [cars] = useState<Car[]>([
    { id: 1, name: "Toyota Corolla", price: 50, image: "/toyota_corolla.jpg", description: "Reliable and fuel-efficient sedan." },
    { id: 2, name: "Honda Civic", price: 60, image: "/cars/car2.jpg", description: "Comfortable and stylish sedan." },
    { id: 3, name: "BMW 3 Series", price: 120, image: "/cars/car3.jpg", description: "Luxury and high performance." },
    { id: 4, name: "Ford Mustang", price: 150, image: "/cars/car4.jpg", description: "Sporty and powerful coupe." },
    { id: 5, name: "Jeep Wrangler", price: 130, image: "/cars/car5.jpg", description: "Perfect for off-road adventures." },
  ]);

  const handleBooking = (carId: number) => {
    if (!user) {
      router.push("/login");
      return;
    }
    router.push(`/booking/${carId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-100 via-amber-50 to-white py-12 overflow-hidden">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center px-6 lg:px-0 gap-6">

          {/* Left Side */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-6 lg:pl-12">
            <h1 className="text-4xl lg:text-5xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-400 animate-slideIn">
              Drive Your Dream
            </h1>
            <p className="text-lg lg:text-xl  text-gray-700 leading-relaxed animate-slideIn delay-200">
              Explore our premium collection of cars, designed for style, comfort, and unforgettable adventures. Your perfect ride awaits!
            </p>
            <button
              onClick={() => router.push(user ? "/booking" : "/login")}
              className="bg-indigo-600  text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition animate-slideIn delay-400"
            >
              Start Booking
            </button>
          </div>

          {/* Right Side */}
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

      {/* Car List Section */}
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-16">Our Premium Cars</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:scale-105 transition-all w-64"
            >
              <div className="relative w-full h-44">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-indigo-700">{car.name}</h3>
                <p className="text-gray-500 mb-2">{car.description}</p>
                <p className="text-indigo-600 font-bold text-lg mb-3">${car.price}/day</p>
                <button
                  onClick={() => handleBooking(car.id)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.6s forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}
