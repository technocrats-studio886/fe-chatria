import axiosClient from "./axiosClient";
import { getToken } from "@/utils/token";

interface ChatMessage {
    id: number;
    content: string;
    sender: {
        id : number;
    }
    receiver: {
        id : number;
    }
    created_at: string;
}

export const getChatMessages = async (roomId: number): Promise<ChatMessage[]> => {
    try {
        const token = getToken();
        const response = await axiosClient.get(`/chat/${roomId}/messages`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.payload;
    } catch (error) {   
        console.error("Error fetching chat messages:", error);
        throw new Error('Failed to fetch chat messages');
    }
};