"use client";

import { HeroSection, Navbar, CarCard } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useCars } from "@/hooks/useCars";

export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { cars, loading } = useCars();
  const router = useRouter();



  const handleBooking = (carId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }
    router.push(`/booking/${carId}`);
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
              onBooking={handleBooking}
              onClick={() => handleCardClick(car.id)}
            />
          ))}
        </div>
      </section>


    </div>
  );
}
