'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent as SidebarContentWrapper,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Landmark, LayoutDashboard, User, Settings, LogOut, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import AdminDialog from './AdminDialog';

export default function SidebarContentComponent() {
  const pathname = usePathname();
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Landmark className="h-8 w-8 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">FinSim</h2>
            <p className="text-xs text-muted-foreground">Your Financial Simulator</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContentWrapper className="p-0">
        <SidebarMenu className="p-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/dashboard')} tooltip={{ children: 'Dashboard' }}>
                <Link href="/dashboard">
                    <LayoutDashboard />
                    Dashboard
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/dashboard/profile')} tooltip={{ children: 'Profile' }}>
                <Link href="/dashboard/profile">
                    <User />
                    Profile
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <SidebarMenuButton asChild isActive={isActive('/dashboard/settings')} tooltip={{ children: 'Settings' }}>
                <Link href="/dashboard/settings">
                    <Settings />
                    Settings
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContentWrapper>
      <SidebarFooter className='p-2'>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setIsAdminDialogOpen(true)} tooltip={{ children: 'Admin Panel' }}>
                    <ShieldAlert />
                    Admin Panel
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{ children: 'Logout' }}>
                    <Link href="/">
                        <LogOut />
                        Logout
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <AdminDialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen} />
    </>
  );
}
