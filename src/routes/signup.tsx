import { createFileRoute, redirect } from '@tanstack/react-router'
import RegisterPage from '@/pages/auth/Register'
import { getToken } from '@/utils/token';
export const Route = createFileRoute('/signup')({
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
  return <RegisterPage />
}
