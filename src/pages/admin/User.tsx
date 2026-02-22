import BaseLayout from "@/layouts/base-layout"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { useEffect , useState} from "react";
import { getUsers } from "@/api/userApi";
import type { User } from "@/api/userApi";

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    
    useEffect( () => {
            const fetchUsers = async () => {
                const {users} = await getUsers();
                setUsers( 
                    users.map(user => ({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        fullname: user.fullname,
                        identityCard: user.identityCard,
                        verifiedAt: user.verifiedAt,
                    }))
                );

            };
            fetchUsers();   
        }, []);
        console.log(users);
    return (
        <BaseLayout>
        <div>
            <h1 className="font-bold text-lg ">User Management Page</h1>
            <p>Manage your application's users here.</p>    
        </div>
        <div className="w-full mt-5">
<Table>
  <TableHeader className="text-white">
    <TableRow>
      <TableHead className=" text-white">Data</TableHead>      
      <TableHead className="text-white">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map(user => (
    <TableRow key={user.id}>
      <TableCell className="font-medium text-white">
        <h1>{user.fullname}</h1>
        <p>{user.username}</p>
        <p>{user.email}</p>
        </TableCell>
      <TableCell>
        
        <div className="mb-2 flex flex-col gap-2">
            <Button variant="secondary" size="xs">
          Identity
        </Button>
        
        {
            user.verifiedAt ?? (
                <>
                        <Button className="bg-green-500" size="xs">
          Accept 
        </Button>
                <Button variant="destructive" size="xs">
          Decline
        </Button>
                </>
            )
        }

        </div>

        
      </TableCell>
      
    </TableRow>
    ))}
    
  </TableBody>
    
</Table>
        </div>
        </BaseLayout>
    );
}