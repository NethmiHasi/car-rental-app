"use client";

import { CarCard } from "@/components";
import { useCar } from "@/hooks/useCars";
import { RootState } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function CarDetailsPage() {
    const params = useParams();
    const carId = Array.isArray(params.id) ? params.id[0] : params.id;
    const { car, loading } = useCar(carId);
    const user = useSelector((state: RootState) => state.auth.user);

    const router = useRouter();



    const handleBooking = (carId: string) => {
        if (!user) {
            router.push("/login");
            return;
        }
        router.push(`/booking/${carId}`);
    };

    if (loading) return <div className="text-center mt-20">Loading cars...</div>;
    if (!car) return <div className="text-center mt-20">Car not found</div>;

    if (loading) return <div className="text-center mt-20">Loading car details...</div>;
    if (!car) return <div className="text-center mt-20">Car not found</div>;

    return (
        <div className="container mx-auto px-6 py-10">
            <CarCard car={car} detailed onBooking={handleBooking} />
        </div>
    );

}