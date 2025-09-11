"use client";

import { AppDispatch, RootState } from "@/store";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Booking, createBooking, updateBooking } from "@/store/slices/bookingSlice";
import { useRouter } from "next/navigation";


interface BookingFormProps {
    carId: string;
    carName: string;
    price: number;
    open: boolean;
    onClose: () => void;
    bookingToEdit?: Booking;
}

export default function BookingForm({
    carId,
    carName,
    price,
    open,
    onClose,
    bookingToEdit,
}: BookingFormProps) {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const loading = useSelector((state: RootState) => state.booking.loading);
    const router = useRouter();

    useEffect(() => {
        if (bookingToEdit) {
            setStartDate(bookingToEdit.startDate);
            setEndDate(bookingToEdit.endDate);
        } else {
            setStartDate("");
            setEndDate("");
        }
    }, [bookingToEdit, open]);


    const totalDays = useMemo(() => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
        return diff > 0 ? diff : 0;
    }, [startDate, endDate]);

    const totalPrice = totalDays * price;

    const handleBooking = async () => {
        if (!user) return alert("Please login to book");
        if (!startDate || !endDate || totalDays <= 0)
            return alert("Please select start and end date");
        if (new Date(endDate) <= new Date(startDate)) {
            return alert("End date must be after start date");
        }
        if (bookingToEdit?.id) {

            await dispatch(
                updateBooking({ id: bookingToEdit.id, startDate, endDate })
            );
            alert("Booking updated!");
        } else {
            await dispatch(
                createBooking({
                    userId: user.uid,
                    carId,
                    carName,
                    startDate,
                    endDate,
                    price: totalPrice,
                })

            );
            alert("Booking successful!");

        }

        onClose();
        router.push("/bookings");
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative transform transition-transform duration-300 ease-out scale-100">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-xl"
                >
                    ✕
                </button>

                <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">{bookingToEdit ? `Edit Booking` : `Book ${carName}`}</h2>

                <div className="space-y-5">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Select start Date"
                        />
                    </div>

                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Select end Date"
                        />
                    </div>


                    {totalDays > 0 && (
                        <div className="text-lg font-semibold text-indigo-700 text-center">
                            Total: ${totalPrice} for {totalDays} days
                        </div>
                    )}

                    <button
                        onClick={handleBooking}
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-200 font-semibold"
                        disabled={loading}
                    >
                        {loading
                            ? bookingToEdit
                                ? "Updating..."
                                : "Booking..."
                            : bookingToEdit
                                ? "Update Booking"
                                : "Confirm Booking"}
                    </button>
                </div>
            </div>
        </div>
    );
}