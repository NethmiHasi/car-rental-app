"use client";

import { BookingForm, CarCard, Footer, Navbar } from "@/components";
import { useCar } from "@/hooks/useCars";
import { RootState } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CarDetailsPage() {
    const params = useParams();
    const carId = Array.isArray(params.id) ? params.id[0] : params.id;
    const { car, loading } = useCar(carId);
    const user = useSelector((state: RootState) => state.auth.user);

    const router = useRouter();

    const [showBooking, setShowBooking] = useState(false);



    const handleBooking = () => {
        if (!user) {
            router.push("/login");
            return;
        }
        setShowBooking(true);
    };

    if (loading) return <div className="text-center mt-20">Loading cars...</div>;
    if (!car) return <div className="text-center mt-20">Car not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="container mx-auto px-6 py-10 flex-1 pt-24">
                <CarCard car={car} detailed onBooking={handleBooking} />
                <BookingForm
                    open={showBooking}
                    onClose={() => setShowBooking(false)}
                    carId={car.id}
                    carName={`${car.make} ${car.model}`}
                    price={car.price}
                />
            </main>
            <Footer />
        </div>
    );

}