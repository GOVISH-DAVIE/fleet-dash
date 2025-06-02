import { Truck, AlertCircle, Calendar } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Vehicle {
  id: number;
  registrationNumber: string;
  make: string;
  model: string;
  status: string;
  fuelLevel: number;
  lastServiced: Date;
  nextService: Date;
  mileage: number;
  image: string;
}

interface VehicleListProps {
  vehicles: Vehicle[];
}

const VehicleList = ({ vehicles }: VehicleListProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge badge-success">Active</span>;
      case 'maintenance':
        return <span className="badge badge-warning">Maintenance</span>;
      case 'inactive':
        return <span className="badge badge-error">Inactive</span>;
      default:
        return <span className="badge badge-neutral">Unknown</span>;
    }
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const getServiceIndicator = (nextService: Date) => {
    const today = new Date();
    const days = Math.ceil((nextService.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) {
      return <span className="badge badge-error">Overdue</span>;
    } else if (days <= 7) {
      return <span className="badge badge-warning">{days} days</span>;
    } else {
      return <span className="badge badge-success">{days} days</span>;
    }
  };

  return (
    <div className="dashboard-card border-l-primary">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Active Vehicles</h3>
          <button className="btn btn-outline text-xs">View All</button>
        </div>
        
        <div className="space-y-4">
          {vehicles.slice(0, 4).map((vehicle) => (
            <div key={vehicle.id} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="h-14 w-14 rounded-md overflow-hidden mr-4 flex-shrink-0">
                <img 
                  src={vehicle.image} 
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h4 className="text-sm font-semibold text-gray-800">{vehicle.registrationNumber}</h4>
                    <div className="mx-2">{getStatusBadge(vehicle.status)}</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-gray-500 mr-2">Fuel:</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          vehicle.fuelLevel > 50 ? "bg-success" : 
                          vehicle.fuelLevel > 25 ? "bg-warning" : "bg-error"
                        )}
                        style={{ width: `${vehicle.fuelLevel}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-1">{vehicle.make} {vehicle.model}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <Truck size={14} className="mr-1" />
                    <span>{vehicle.mileage.toLocaleString()} km</span>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <AlertCircle size={14} className="mr-1" />
                    <span>Next service: {getServiceIndicator(vehicle.nextService)}</span>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>Last serviced: {formatDate(vehicle.lastServiced)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleList;