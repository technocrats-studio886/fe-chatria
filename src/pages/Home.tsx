import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getToken } from "@/utils/token";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client"
import UserList, { type User } from "@/components/UserList";
import AddChatModal from "@/components/AddChatModal";
import { getUsers } from "@/api/userApi";
import { getChatMessages } from "@/api/chatApi";

interface Message {
    senderId: number;
    receiverId: number;
    text: string;
}

interface Room {
    roomId: number;
    roomKey: string;
}

export default function Home() {
    const [message, setMessage] = useState("");
    const [room, setRoom] = useState<Room | null>(null);
    const [messages, setMessages] = useState<Array<Message>>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isAddChatModalOpen, setIsAddChatModalOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    //save socket instance in a ref to persist across renders
    const socketRef = useRef<Socket | null>(null);
    const token = getToken();
    useEffect(() => {
        const socket = io("http://localhost:3001",

            {
                auth: {
                    token: token
                }

            });
        socketRef.current = socket;
        socketRef.current.on("connect", () => {
            console.log("Connected to server with ID:", socket.id);
        });
        socketRef.current.on("joined_private",(data: Room) => {
            console.log(data);
            setRoom((data));
            const fetchMessages = async () => {
                const msgs = await getChatMessages(data.roomId);
                setMessages(
                    msgs.map(msg => ({
                        senderId: msg.sender.id,
                        receiverId: msg.receiver.id,
                        text: msg.content
                    }))
                );
            }
            fetchMessages();
        });
        socketRef.current.on("receive_private_message", (data: Message) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socketRef.current?.off("receive_private_message");
            socketRef.current?.disconnect();
        }
    }, []);
    useEffect( () => {
        const fetchUsers = async () => {
            const {users} = await getUsers();
            setUsers( 
                users.map(user => ({
                    id: user.id,
                    username: user.username,
                    isOnline: true
                }))
            );
        };
        fetchUsers();   
    }, []);
    
    const handleSendMessage = () => {
        console.log(room);
        if (!socketRef.current) return;
        socketRef.current.emit("private_message", {
            'roomId': room?.roomId,
            'roomKey': room?.roomKey,
            "receiverId": selectedUser?.id,
            "text": message
        });
        setMessage("");
    }

    const handleAddChat = (username: string) => {
        // Add logic to start a new chat with the selected user
        const newUser = users.find(u => u.username === username);
        if (newUser) {
            setSelectedUser(newUser);
        }
        console.log(`Starting chat with: ${username}`);
    };
    const onUserSelect = (user: User) => {
        setSelectedUser(user);
        socketRef.current?.emit("join_private", {
            targetUserId: user.id
        });
        
    }
    return (
        <div className=" flex items-center justify-center bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
            <div className="min-h-screen">

                <h1 className="text-4xl font-bold text-white my-5">Welcome to the Chatapp !</h1>
                <Card className="overflow-hidden p-0 w-6xl h-5/6 ">
                    <CardContent className="grid p-0 md:grid-cols-2 h-[85vh]">
                        <div className="p-4 border-r border-slate-700">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">Users</h2>
                                <Button
                                    size="sm"
                                    onClick={() => setIsAddChatModalOpen(true)}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    + Add Chat
                                </Button>
                            </div>
                            <UserList
                                users={users}
                                selectedUserId={selectedUser?.id}
                                onUserSelect={onUserSelect}
                            />
                        </div>
                        <div className="p-4 relative">
                            <h2 className="text-xl font-semibold mb-4">
                                Chat Room {selectedUser ? `- ${selectedUser.username}` : ""}
                            </h2>
                            <ul>
                                {messages.map((msg, index) => {
                                    if (msg.senderId === selectedUser?.id) {
                                        return (
                                            <li key={index} className="mb-2 text-left">
                                                <span className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg inline-block">
                                                    {msg.text}
                                                </span>
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li key={index} className="mb-2 text-right">
                                                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg inline-block">
                                                    {msg.text}
                                                </span>
                                            </li>
                                        );
                                    }
})}
                            </ul>
                            <div className=" flex justify-between items-end gap-3 absolute bottom-4 left-4 right-4">
                                <Input value={message} onChange={(e) => setMessage(e.target.value)} className="" placeholder="Type your message..." />
                                <Button className="mt-4" onClick={handleSendMessage}>Send Message</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div>

                </div>

                <AddChatModal
                    isOpen={isAddChatModalOpen}
                    onClose={() => setIsAddChatModalOpen(false)}
                    onAddChat={handleAddChat}
                    availableUsers={users.map(user => ({
                        id: user.id,
                        username: user.username,
                        isOnline: user.isOnline || false
                    }))}
                />

            </div>
        </div>
    )
}