import axios from "axios";

export const getError = (error: unknown):string|null => {
    if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.errors[0].errorMessage || "Something went wrong!";
        return errorMessage;
    } else {
        console.error("Unknown Error:", error);
        return null;
    }
};

