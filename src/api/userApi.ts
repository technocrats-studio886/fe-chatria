import axiosClient from "./axiosClient";
import { getToken } from "@/utils/token";

export interface User {
    id: number;
    username: string;
    email: string;
    fullname: string;
    identityCard: string;
    verifiedAt: string | null;
}
export interface UserApi {
        users: User[];
    
}

export const getUsers = async (): Promise<UserApi> => {
    try {
        const token = getToken();
        const response = await axiosClient.get("/users", {
            headers: {
            Authorization: `Bearer ${token}`
        }
        });
        return response.data.payload;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
    };


