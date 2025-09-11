"use client";
import Image from "next/image";

interface Car {
  id: string;
  make: string;
  model: string;
  price: number;
  year: number
  image: string;
  seat: number;
  availability: boolean;
  description: string;
}

interface CarCardProps {
  car: Car;
  onBooking?: (id: string) => void;
  onClick?: () => void
  detailed?: boolean;
}

const CarCard = ({ car, onBooking, onClick, detailed = false }: CarCardProps) => {

  return (
    <div
      className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all ${detailed
        ? "w-full max-w-4xl mx-auto flex flex-col lg:flex-row gap-10 p-8"
        : "hover:shadow-3xl transform hover:scale-105 w-64"
        }`}
      onClick={onClick}
    >
      <div className={`relative ${detailed ? "w-full lg:w-1/2 h-80 lg:h-[400px]" : "w-full h-44"}`}>
        <Image
          src={car.image}
          alt={car.make}
          fill
          className={`object-cover rounded-3xl ${detailed ? "shadow-2xl" : ""}`}
        />
      </div>
      <div className={`p-4 ${detailed ? "lg:w-1/2 space-y-4 text-left" : "text-center"}`}>
        <h3 className={`text-indigo-700 font-bold ${detailed ? "text-4xl" : "text-xl"}`}>
          {car.make} {car.model}
        </h3>
        {detailed && (
          <>
            <p className="text-gray-600">{car.description}</p>
            <p className="text-lg">Year: {car.year}</p>
            <p className="text-lg">Seats: {car.seat}</p>
            <p
              className={car.availability ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}
            >
              {car.availability ? "Available" : "Not Available"}
            </p>
          </>
        )}
        <p className={`text-indigo-600 font-bold ${detailed ? "text-2xl" : "text-lg"}`}>${car.price}/day</p>
        {onBooking && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBooking(car.id);
            }}
            className={`w-full py-2 rounded-full transition mt-2 
              ${car.availability
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            disabled={!car.availability}
          >
            {car.availability ? "Book Now" : "Not Available"}
          </button>
        )}
      </div>
    </div>
  );
};



export default CarCard