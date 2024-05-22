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
      <DropdownMenuTrigger className='w-[150px] py-1 px-3 flex items-center gap-2 bg-slate-100 rounded-md'>
        <Image
          width={30}
          height={30}
          objectFit='contain'
          src={'/funny.jpeg'}
          alt='user avatar'
          className='rounded-full w-8 h-8 bg-slate-300 p-1'
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
