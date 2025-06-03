import { Bell, Calendar, Droplet, Wrench, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Alert {
  id: number;
  type: 'maintenance' | 'fuel' | 'driver' | 'system' | 'vehicle';
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

interface RecentAlertsCardProps {
  alerts: Alert[];
}

const RecentAlertsCard = ({ alerts }: RecentAlertsCardProps) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'maintenance':
        return <Wrench size={16} />;
      case 'fuel':
        return <Droplet size={16} />;
      case 'driver':
        return <Calendar size={16} />;
      case 'system':
        return <Bell size={16} />;
      case 'vehicle':
        return <AlertTriangle size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  const getPriorityClass = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 text-error';
      case 'medium':
        return 'bg-warning/10 text-warning-dark';
      case 'low':
        return 'bg-success/10 text-success';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="dashboard-card border-l-error">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Alerts</h3>
        
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className={cn(
                "p-2 rounded-full",
                getPriorityClass(alert.priority)
              )}>
                {getAlertIcon(alert.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
              
              <div className={cn(
                "text-xs px-2 py-1 rounded-full font-medium",
                getPriorityClass(alert.priority)
              )}>
                {alert.priority}
              </div>
            </div>
          ))}
        </div>
       
      </div>
    </div>
  );
};

export default RecentAlertsCard;