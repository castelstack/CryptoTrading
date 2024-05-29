import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ReactNode } from 'react';

export const ToolTipText = ({
  title,
  text,
}: {
  title: ReactNode;
  text: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{title}</TooltipTrigger>
        <TooltipContent className=' text-[10px] w-[180px] leading-3'>
          {/* <p className=''> */}
            {text}
          {/* </p> */}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
