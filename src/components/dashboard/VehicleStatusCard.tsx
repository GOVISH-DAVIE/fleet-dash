import { useEffect, useState } from 'react';
import { ArrowRight, Circle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface VehicleStatusCardProps {
  active: number;
  maintenance: number;
  inactive: number;
  total: number;
}

export const VehicleStatusCardWrapper = () => {
  const [statusData, setStatusData] = useState({
    active: 0,
    maintenance: 0,
    inactive: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicleStatus = async () => {
      try {
        const res = await fetch('https://fleet.intelligentso.com/api/v1/vehicle/status');
        const json = await res.json();

        if (json.success && json.data) {
          setStatusData({
            active: json.data.active,
            maintenance: json.data.maintenance,
            inactive: json.data.inactive,
            total: json.data.total,
          });
        }
      } catch (error) {
        console.error('Failed to fetch vehicle status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleStatus();
  }, []);

  if (loading) return <p className="p-4 text-sm text-gray-500">Loading vehicle status...</p>;

  return <VehicleStatusCard {...statusData} />;
};


const VehicleStatusCard = ({ active, maintenance, inactive, total }: VehicleStatusCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="dashboard-card border-l-primary">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Vehicle Status</h3>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs font-medium text-primary flex items-center gap-1 hover:underline"
          >
            {showDetails ? 'Hide Details' : 'View Details'}
            <ArrowRight size={14} />
          </button>
        </div>
        
        <div className="mb-4">
          <div className="flex h-3 mb-1 overflow-hidden rounded-full bg-gray-200">
            <div 
              className="bg-success" 
              style={{ width: `${(active / total) * 100}%` }}
            />
            <div 
              className="bg-warning" 
              style={{ width: `${(maintenance / total) * 100}%` }}
            />
            <div 
              className="bg-error" 
              style={{ width: `${(inactive / total) * 100}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        
        <div className={cn(
          "grid gap-3 transition-all duration-300",
          showDetails ? "grid-cols-3" : "grid-cols-1"
        )}>
          <div className="flex items-center gap-2">
            <Circle size={10} className="text-success fill-success" />
            <div>
              <div className="text-lg font-semibold">{active}</div>
              <div className="text-xs text-gray-500">Active</div>
            </div>
          </div>
          
          {showDetails && (
            <>
              <div className="flex items-center gap-2">
                <Circle size={10} className="text-warning fill-warning" />
                <div>
                  <div className="text-lg font-semibold">{maintenance}</div>
                  <div className="text-xs text-gray-500">Maintenance</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Circle size={10} className="text-error fill-error" />
                <div>
                  <div className="text-lg font-semibold">{inactive}</div>
                  <div className="text-xs text-gray-500">Inactive</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleStatusCard;