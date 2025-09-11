import { db } from "@/lib/firebaseClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export interface Booking {
    id?: string;
    userId: string;
    carId: string;
    carName: string;
    startDate: string;
    endDate: string;
    price: number;
    createdAt: number;
}

interface BookingState {
    bookings: Booking[];
    loading: boolean;
    error: string | null;
}

const initialState: BookingState = {
    bookings: [],
    loading: false,
    error: null,
};

export const fetchBookings = createAsyncThunk(
    "bookings/fetchBookings",
    async (userId: string, thunkAPI) => {
        try {
            const q = query(collection(db, "bookings"), where("userId", "==", userId));
            const snap = await getDocs(q);
            const data: Booking[] = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch bookings");

        }
    }
);

export const createBooking = createAsyncThunk(
    "bookings/createBooking",
    async (booking: Omit<Booking, "id" | "createdAt">, { rejectWithValue }) => {
        try {
            const docRef = await addDoc(collection(db, "bookings"), {
                ...booking,
                createdAt: Date.now(),
            });
            return { id: docRef.id, ...booking, createdAt: Date.now() };

        } catch (error) {
            return rejectWithValue("Failed to create bookings");

        }
    }
);

export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createBooking.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings.push(action.payload);
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchBookings.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default bookingSlice.reducer;