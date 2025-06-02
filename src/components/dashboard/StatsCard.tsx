import { cn } from '../../utils/cn';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    type: 'positive' | 'negative' | 'neutral';
  };
  colorClass?: string;
}

const StatsCard = ({ title, value, icon: Icon, change, colorClass = 'border-primary' }: StatsCardProps) => {
  return (
    <div className={cn('dashboard-card', colorClass)}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="mt-1 text-2xl font-semibold">{value}</h3>
          </div>
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon size={20} className="text-primary" />
          </div>
        </div>
        
        {change && (
          <div className="mt-4 flex items-center">
            <span className={cn(
              "text-xs font-medium px-1.5 py-0.5 rounded",
              change.type === 'positive' && 'bg-success/10 text-success',
              change.type === 'negative' && 'bg-error/10 text-error',
              change.type === 'neutral' && 'bg-gray-100 text-gray-600'
            )}>
              {change.value}%
            </span>
            <span className="ml-2 text-xs text-gray-500">from last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;