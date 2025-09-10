"use client";

import { auth } from "@/lib/firebaseClient";
import { setUser } from "@/store/slices/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthListener() {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                dispatch(
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName,
                        phoneNumber: firebaseUser.phoneNumber,
                    })
                )
            }

        });
        return () => unsub();
    }, [dispatch]);

    return null;


}