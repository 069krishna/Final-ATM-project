'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Landmark, LayoutDashboard, User, Settings, LogOut } from 'lucide-react';

export default function SidebarContentComponent() {
  const pathname = usePathname();

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
      <SidebarContent className="p-0">
        <SidebarMenu className="p-2">
          <SidebarMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <SidebarMenuButton isActive={isActive('/dashboard')} tooltip={{ children: 'Dashboard' }}>
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/dashboard/profile" legacyBehavior passHref>
              <SidebarMenuButton isActive={isActive('/dashboard/profile')} tooltip={{ children: 'Profile' }}>
                <User />
                Profile
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/dashboard/settings" legacyBehavior passHref>
              <SidebarMenuButton isActive={isActive('/dashboard/settings')} tooltip={{ children: 'Settings' }}>
                <Settings />
                Settings
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className='p-2'>
        <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/" legacyBehavior passHref>
                    <SidebarMenuButton tooltip={{ children: 'Logout' }}>
                        <LogOut />
                        Logout
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
