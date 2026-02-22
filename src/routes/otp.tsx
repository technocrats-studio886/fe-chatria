import OtpPage from '@/pages/auth/Otp';
import { getToken } from '@/utils/token';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/otp')({
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
  return <OtpPage />;
}
