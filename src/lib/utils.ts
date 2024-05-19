import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const a = axios.create({
    baseURL: "http://localhost:3000/api/v1", // Set your base URL
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Include credentials in requests
});

export default a;
