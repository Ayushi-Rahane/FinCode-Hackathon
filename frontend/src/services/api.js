import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// --- Upload ---
export const uploadStatement = (formData) =>
    api.post("/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

// --- Analysis ---
export const getScore = () => api.get("/analysis/score");

// --- Recommendations ---
export const getLoanRecommendations = () => api.get("/recommendations/loans");

export default api;
