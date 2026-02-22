import UserManagement from '@/pages/admin/User';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserManagement />;
}
