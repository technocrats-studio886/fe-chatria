
import axiosClient from "./axiosClient";

export async function loginUser(username: string, password: string) {
    try {
        
    const response = await axiosClient.post('/auth/login', { username, password });
    return response.data;
    } catch (error) {
        throw error;
    }
    
}
