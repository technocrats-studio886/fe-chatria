import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
export default function BaseLayout({ children }: { children: React.ReactNode }) {
    return (
<div className="bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
         <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className="flex flex-col px-5 justify-center w-screen text-white">
            
        {children}
        </div>
      </main>
    </SidebarProvider>
      </div>
    );
}   