import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { removeToken } from "@/utils/token";
import { Link, useNavigate } from "@tanstack/react-router";


export function AppSidebar() {
   const navigate = useNavigate();
   const handleLogout = () => {
          // Clear token and redirect to login page
          removeToken();
          navigate({
              to: "/login"
          });
      }
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
  <SidebarGroupLabel>Admin</SidebarGroupLabel>
  <SidebarGroupContent>
<SidebarMenuItem>
  <SidebarMenuButton asChild>
    <a href="#">
      
      <span>Dashboard</span>
    </a>
  </SidebarMenuButton>
  </SidebarMenuItem>
  <SidebarMenuItem>
   <SidebarMenuButton asChild>
    <Link to="/admin/users" className="w-full h-full">
      
      <span>Users</span>
    </Link>
  </SidebarMenuButton>
  </SidebarMenuItem>
  </SidebarGroupContent>
</SidebarGroup>

  <SidebarGroup>
  <SidebarGroupLabel>Chat</SidebarGroupLabel>
  <SidebarGroupContent>
<SidebarMenuItem>
  <SidebarMenuButton asChild>

    <Link to="/" className="w-full h-full">
      <span>All Chats</span>
    </Link>
  
  </SidebarMenuButton>
  </SidebarMenuItem>
  <SidebarMenuItem>
   <SidebarMenuButton asChild>
    <a href="#">
      
      <span>Archived Chats</span>
    </a>
  </SidebarMenuButton>
  </SidebarMenuItem>
  </SidebarGroupContent>
</SidebarGroup>
      <SidebarGroup>
  <SidebarGroupLabel>Setting</SidebarGroupLabel>
  <SidebarGroupContent>
<SidebarMenuItem>
  <SidebarMenuButton asChild>
    <a href="#">
      
      <span>Profile</span>
    </a>
  </SidebarMenuButton>
  </SidebarMenuItem>
  <SidebarMenuItem>
   <SidebarMenuButton asChild>
    <button onClick={handleLogout}>
      
      <span>Logout</span>
    </button>
  </SidebarMenuButton>
  </SidebarMenuItem>
  </SidebarGroupContent>
</SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}