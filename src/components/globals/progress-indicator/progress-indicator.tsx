import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

export interface ProgressIndicatorProps {
  color?: string;
}

export const ProgressIndicator = ({ color }: ProgressIndicatorProps) => {
  return <Loader className={cn('h-4 w-4 animate-spin', color)} />;
};
