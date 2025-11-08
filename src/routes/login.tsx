import { createFileRoute, redirect } from '@tanstack/react-router'
import LoginPage from '@/pages/auth/Login'
import { getToken } from '@/utils/token';
export const Route = createFileRoute('/login')({
  beforeLoad: ()=> {
    const token = getToken();
    if (token){
      throw redirect({
        to: "/"
      });
    }

  },
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginPage />;
}
  