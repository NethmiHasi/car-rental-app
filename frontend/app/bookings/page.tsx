"use client";

import { BookingsTable, Navbar } from "@/components";
import { AppDispatch, RootState } from "@/store";
import { fetchBookings } from "@/store/slices/bookingSlice";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

export default function MyBookings() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const { bookings, loading, error } = useSelector((state: RootState) => state.booking);

    useEffect(() => {
        if (user) {
            dispatch(fetchBookings(user.uid));
        }
    }, [user, dispatch]);

    if (!user) return <div className="text-center mt-20 text-gray-900">Please login to view your bookings.</div>;
    if (loading) return <div className="text-center mt-20 text-gray-900">Loading your bookings...</div>;
    if (error) return <div className="text-center mt-20 text-red-600 font-semibold">{error}</div>;


    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-6 py-12 pt-24">
                <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-10 text-center">
                    My Bookings
                </h1>

                {bookings.length === 0 ? (
                    <div className="text-center text-gray-600 mt-10">You have no bookings yet.</div>
                ) :  <BookingsTable bookings={bookings} />}
            </div>
        </div>
    );
}