"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserAuth, login } from "./slices/AuthSlice";
import { AppDispatch } from "./Store";

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserAuth()); // Fetch auth status from API

    // Restore `userID` from localStorage (Client-side only)
    if (typeof window !== "undefined") {
      const storedUserID = localStorage.getItem("userID");
      if (storedUserID) {
        dispatch(login(storedUserID));
      }
    }
  }, [dispatch]);

  return null;
}
