"use client";

import { HeroSection, Navbar, CarCard, BookingForm } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { Car, useCars } from "@/hooks/useCars";
import { useState } from "react";

export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { cars, loading } = useCars();
  const router = useRouter();

  const [selectedCar, setSelectedCar] = useState<{
    id: string;
    make: string;
    model: string;
    price: number;
  } | null>(null);



  const handleBooking = (car: Car) => {
    if (!user) {
      router.push("/login");
      return;
    }
    setSelectedCar({
      id: car.id,
      make: car.make,
      model: car.model,
      price: car.price,
    });
  };

  const handleCardClick = (carId: string) => {
    router.push(`/cars/${carId}`);
  };

  if (loading) return <div className="text-center mt-20">Loading cars...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-16">Our Premium Cars</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onBooking={() => handleBooking(car)}
              onClick={() => handleCardClick(car.id)}
            />
          ))}
        </div>
      </section>
      {selectedCar && (
        <BookingForm
          carId={selectedCar.id}
          carName={`${selectedCar.make} ${selectedCar.model}`}
          price={selectedCar.price}
          open={!!selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}



    </div>
  );
}
