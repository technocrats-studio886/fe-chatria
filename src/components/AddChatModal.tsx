import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { X, Search } from "lucide-react";

interface AddChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddChat: (username: string) => void;
    availableUsers: Array<{ id: number; username: string; isOnline: boolean }>;
}

export default function AddChatModal({ isOpen, onClose, onAddChat, availableUsers }: AddChatModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const filteredUsers = availableUsers.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUserSelect = (username: string) => {
        setSelectedUsers(prev => 
            prev.includes(username) 
                ? prev.filter(u => u !== username)
                : [...prev, username]
        );
    };

    const handleAddChat = () => {
        selectedUsers.forEach(username => onAddChat(username));
        setSelectedUsers([]);
        setSearchQuery("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Start New Chat</h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="p-1"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex-1 overflow-y-auto mb-4">
                    <div className="space-y-2">
                        {filteredUsers.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No users found</p>
                        ) : (
                            filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                                        selectedUsers.includes(user.username)
                                            ? "bg-blue-100 border-blue-300"
                                            : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                                    }`}
                                    onClick={() => handleUserSelect(user.username)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className={`w-3 h-3 rounded-full ${
                                                    user.isOnline ? "bg-green-500" : "bg-gray-400"
                                                }`}
                                            />
                                            <span className="font-medium">{user.username}</span>
                                        </div>
                                        {selectedUsers.includes(user.username) && (
                                            <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddChat}
                        disabled={selectedUsers.length === 0}
                        className="flex-1"
                    >
                        Start Chat ({selectedUsers.length})
                    </Button>
                </div>
            </div>
        </div>
    );
}