import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface AuthState {
    user: {
        uid: string;
        email: string | null;
        displayName: string | null;
        phoneNumber: string | null;
    } | null
}

const initialState: AuthState = {
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{
            uid: string;
            email: string | null;
            displayName: string | null;
            phoneNumber: string | null;
        } | null>) {
            state.user = action.payload
        },
    },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer