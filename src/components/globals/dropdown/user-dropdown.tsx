'use client';
import {
  Card,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export interface UserPopoverProps {
  children: React.ReactNode;
}

const UserPopover = (props: UserPopoverProps) => (
  <>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Card className="flex items-center gap-2 p-2">{props.children}</Card>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>
);

export default UserPopover;
