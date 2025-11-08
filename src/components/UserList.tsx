interface User {
    id: number;
    username: string;
    isOnline?: boolean;
}

interface UserListProps {
    users: User[];
    onUserSelect?: (user: User) => void;
    selectedUserId?: number;
}

export default function UserList({ users, onUserSelect, selectedUserId }: UserListProps) {
    return (
        <div className="space-y-2">
            {users.length === 0 ? (
                <p className="text-gray-500 text-sm">No users online</p>
            ) : (
                users.map((user) => (
                    <div
                        key={user.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedUserId === user.id
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        }`}
                        onClick={() => onUserSelect?.(user)}
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
                            {user.isOnline && (
                                <span className="text-xs text-green-600 font-medium">Online</span>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export type { User };