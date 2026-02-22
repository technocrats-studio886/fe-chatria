
import axiosClient from "./axiosClient";

export async function loginUser(username: string) {
    try {
        
    const response = await axiosClient.post('/auth/challenge', { email: username });
    return response.data;
    } catch (error) {
        throw error;
    }
    
}

export async function verifyOtp(username: string, otp: string) {
    try {
        const response = await axiosClient.post('/auth/verify', { email: username, code: otp });
        return response.data;
    } catch (error) {
        throw error;
    }

}

export async function registerUser(username: string, fullname: string, email: string, identityCard: File) {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('fullname', fullname);
        formData.append('email', email);
        formData.append('identity_card', identityCard);
        const response = await axiosClient.post('/auth/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
