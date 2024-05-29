import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

export const AccountDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='w-[150px] shadow py-1 px-3 flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-none'>
        <Image
          width={30}
          height={30}
          src={'/funny.jpeg'}
          alt='user avatar'
          className='rounded-full w-8 h-8 bg-slate-300 dark:bg-slate-900 p-1 object-contain'
        />
        <p>John Doe</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[150px]'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
