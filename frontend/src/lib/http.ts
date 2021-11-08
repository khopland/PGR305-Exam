import axioss from "axios";

const baseURL = "https://localhost:5001";

export const axios = axioss.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
