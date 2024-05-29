import React, { ReactNode } from 'react';
import { Input } from '../ui/input';
import { ToolTipText } from '../atoms/ToolTipText';
import { Info } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: ReactNode;
  end?: ReactNode;
  tip?: string;
}

export const InputExtra: React.FC<InputProps> = ({
  className = '',
  label,
  end,
  tip,
  ...props
}) => {
  return (
    <div className='outer-input flex items-center gap-2'>
      <div className='flex items-center gap-1'>
        <label
          htmlFor={props.id}
          className='text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap'
        >
          {label}
        </label>
        {tip && (
          <ToolTipText
            title={<Info size={12} className='text-slate-500' />}
            text={tip}
          />
        )}
      </div>
      <Input
        className={`inner-input h-full border-none text-right focus-within:ring-0 focus-visible:ring-0 p-0 ${className}`}
        {...props}
      />
      <p className='cursor-default text-xs'>{end}</p>
    </div>
  );
};
