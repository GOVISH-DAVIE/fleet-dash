import { Wrench, CalendarClock, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useEffect, useState } from 'react';

interface MaintenanceRecord {
  id: number;
  vehicleId: number;
  vehicleReg: string;
  type: string;
  date: string;
  status: string;
  facility: string;
}

interface MaintenanceScheduleCardProps {
  records: MaintenanceRecord[];
}

const MaintenanceScheduleCard = () => {
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const res = await fetch('https://fleet.intelligentso.com/api/v1/vehicle/maintaince');
        const result = await res.json();
        if (result.success) {
          console.log('====================================');
          console.log(result);
          console.log('====================================');
          setRecords(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch maintenance records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenance();
  }, []);

  const scheduledMaintenance = records
    // .filter(record => record.status.toLowerCase() === 'Pending')
    // .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const getStatusColor = (date: string) => {
    const maintenanceDate = new Date(date);
    const today = new Date();
    const diffDays = Math.ceil((maintenanceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'text-error';
    if (diffDays <= 7) return 'text-warning-dark';
    return 'text-success';
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="dashboard-card border-l-warning">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Upcoming Maintenance</h3>
          <button className="text-xs font-medium text-primary flex items-center gap-1 hover:underline">
            View Schedule
            <ArrowRight size={14} />
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : scheduledMaintenance.length > 0 ? (
          <div className="space-y-4">
            {scheduledMaintenance.map(record => (
              <div key={record.id} className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Wrench size={18} className="text-warning-dark" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-semibold">{record.vehicleReg}</h4>
                    <span className={cn("text-xs font-medium", getStatusColor(record.date))}>
                      {formatDate(record.date)}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">{record.type} at {record.facility}</p>

                  <div className="flex items-center mt-2">
                    <CalendarClock size={14} className="text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">
                      {(() => {
                        const days = Math.ceil(
                          (new Date(record.date).getTime() - new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                        );
                        if (days < 0) return 'Overdue';
                        if (days === 0) return 'Today';
                        if (days === 1) return 'Tomorrow';
                        return `In ${days} days`;
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Wrench size={24} className="text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No upcoming maintenance scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceScheduleCard;