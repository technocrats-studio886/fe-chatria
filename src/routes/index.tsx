import { createFileRoute, redirect } from '@tanstack/react-router'

import Home from '@/pages/Home'
import { getToken } from '@/utils/token';

export const Route = createFileRoute('/')({
  beforeLoad: ()=> {
    const token = getToken();
   if (!token){
    throw redirect({
      to: "/login"
    });
   }
  }
  ,
  component: RouteComponent,
})

function RouteComponent() {
  return <Home />;
}
