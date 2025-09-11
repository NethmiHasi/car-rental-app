"use client";

import { AppDispatch } from "@/store";
import { Booking, deleteBooking } from "@/store/slices/bookingSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import BookingForm from "./BookingForm";

interface BookingsTableProps {
    bookings: Booking[];
}

export default function BookingsTable({ bookings }: BookingsTableProps) {
    const today = new Date();
    const dispatch = useDispatch<AppDispatch>();


    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [openForm, setOpenForm] = useState(false);

    return (
        <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle bg-white shadow-2xl rounded-3xl p-6">
                <table className="min-w-full text-left divide-y divide-gray-200">
                    <thead className="bg-indigo-600 text-white rounded-t-3xl">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm md:text-base font-semibold">Car Name</th>
                            <th className="px-6 py-4 text-left text-sm md:text-base font-semibold">Start Date</th>
                            <th className="px-6 py-4 text-left text-sm md:text-base font-semibold">End Date</th>
                            <th className="px-6 py-4 text-left text-sm md:text-base font-semibold">Price</th>
                            <th className="px-6 py-4 text-left text-sm md:text-base font-semibold">Status</th>
                            <th className="px-6 py-4 text-left text-sm md:text-base font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {bookings.map((booking) => {
                            const isUpcoming = new Date(booking.startDate) >= today;
                            return (
                                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-indigo-700">{booking.carName}</td>
                                    <td className="px-6 py-4 text-gray-600">{booking.startDate}</td>
                                    <td className="px-6 py-4 text-gray-600">{booking.endDate}</td>
                                    <td className="px-6 py-4 font-medium text-indigo-600">${booking.price}</td>
                                    <td className="px-6 py-4 text-green-600 font-semibold">Confirmed</td>
                                    <td className="px-6 py-4 flex gap-2">
                                        {isUpcoming && (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setSelectedBooking(booking);
                                                        setOpenForm(true);
                                                    }}

                                                    className="px-3 py-1 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const confirmDelete = window.confirm(
                                                            "Are you sure you want to cancel this booking?"
                                                        );
                                                        if (confirmDelete) {
                                                            dispatch(deleteBooking(booking.id!));
                                                        }
                                                    }}
                                                    className="px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 transition">
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <BookingForm
                open={openForm}
                onClose={() => {
                    setOpenForm(false);
                    setSelectedBooking(null);
                }}
                price={selectedBooking?.price || 0}
                carId={selectedBooking?.carId || ""} 
                carName={selectedBooking?.carName || ""}
                bookingToEdit={selectedBooking || undefined}
            />
        </div>
    );
}