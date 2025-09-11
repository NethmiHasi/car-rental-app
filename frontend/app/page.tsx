"use client";

import { Navbar } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import Image from "next/image";

interface Car {
  id: string;
  make: string;
  model: string;
  price: number;
  year: number
  image: string;
  seat:number;
  availability:boolean;
  description: string;
}

export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carCollection = collection(db, "cars");
        const carSnapshot = await getDocs(carCollection);
        const carList = carSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()

        })) as Car[];
        setCars(carList);


      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleBooking = (carId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }
    router.push(`/booking/${carId}`);
  };
  if (loading) return <div className="text-center mt-20">Loading cars...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />


      <section className="relative bg-gradient-to-r from-indigo-100 via-amber-50 to-white py-12 overflow-hidden">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center px-6 lg:px-0 gap-6">


          <div className="lg:w-1/2 text-center lg:text-left space-y-6 lg:pl-12">
            <h1 className="text-4xl lg:text-5xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-400 animate-slideIn">
              Drive Your Dream
            </h1>
            <p className="text-lg lg:text-xl  text-gray-700 leading-relaxed animate-slideIn200">
              Explore our premium collection of cars, designed for style, comfort, and unforgettable adventures. Your perfect ride awaits!
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
                  alt={car.make}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-indigo-700">{car.make}</h3>
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


    </div>
  );
}
