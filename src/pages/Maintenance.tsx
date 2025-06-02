import { useState } from 'react';
import { 
  Plus, Search, Filter, Wrench, Calendar, 
  Truck, AlertCircle, DollarSign, ArrowUpDown, ArrowUp, ArrowDown 
} from 'lucide-react';
import { maintenanceRecords, vehicles } from '../utils/data';
import { cn } from '../utils/cn';

const Maintenance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Handle sort
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get sort icon
  const getSortIcon = (field: string) => {
    if (field !== sortField) return <ArrowUpDown size={16} />;
    return sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };
  
  // Filter and sort maintenance records
  const filteredRecords = maintenanceRecords
    .filter(record => {
      const matchesSearch = 
        record.vehicleReg.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.facility.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesStatus = !statusFilter || record.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortField === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDirection === 'asc' 
          ? dateA.getTime() - dateB.getTime() 
          : dateB.getTime() - dateA.getTime();
      }
      
      const fieldA = a[sortField as keyof typeof a];
      const fieldB = b[sortField as keyof typeof b];
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' 
          ? fieldA.localeCompare(fieldB) 
          : fieldB.localeCompare(fieldA);
      }
      
      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      }
      
      return 0;
    });
    
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <span className="badge badge-warning">Scheduled</span>;
      case 'in-progress':
        return <span className="badge badge-primary">In Progress</span>;
      case 'completed':
        return <span className="badge badge-success">Completed</span>;
      case 'cancelled':
        return <span className="badge badge-error">Cancelled</span>;
      default:
        return <span className="badge badge-neutral">Unknown</span>;
    }
  };
  
  // Get maintenance urgency indicator
  const getUrgencyIndicator = (date: string) => {
    const maintenanceDate = new Date(date);
    const today = new Date();
    const diffDays = Math.ceil((maintenanceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return <AlertCircle size={16} className="text-error" />;
    } else if (diffDays <= 7) {
      return <AlertCircle size={16} className="text-warning" />;
    } else {
      return <AlertCircle size={16} className="text-success" />;
    }
  };

  // Get vehicle image
  const getVehicleImage = (vehicleId: number) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? vehicle.image : '';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-800">Maintenance</h1>
          <p className="text-gray-500 mt-1">Schedule and track vehicle maintenance</p>
        </div>
        
        <div className="flex gap-2">
          <button className="btn btn-primary flex items-center gap-2">
            <Plus size={16} />
            <span>Schedule Maintenance</span>
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search maintenance records..."
            className="input pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            className="select"
            value={statusFilter || ''}
            onChange={e => setStatusFilter(e.target.value || null)}
          >
            <option value="">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <button className="btn btn-outline flex items-center gap-2">
            <Filter size={16} />
            <span className="hidden sm:inline">More Filters</span>
          </button>
        </div>
      </div>
      
      {/* Maintenance records table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('vehicleReg')}
              >
                <div className="flex items-center">
                  <span>Vehicle</span>
                  {getSortIcon('vehicleReg')}
                </div>
              </th>
              <th 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center">
                  <span>Service Type</span>
                  {getSortIcon('type')}
                </div>
              </th>
              <th 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">
                  <span>Date</span>
                  {getSortIcon('date')}
                </div>
              </th>
              <th 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('facility')}
              >
                <div className="flex items-center">
                  <span>Facility</span>
                  {getSortIcon('facility')}
                </div>
              </th>
              <th 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('cost')}
              >
                <div className="flex items-center">
                  <span>Cost</span>
                  {getSortIcon('cost')}
                </div>
              </th>
              <th 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  <span>Status</span>
                  {getSortIcon('status')}
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRecords.map(record => (
              <tr key={record.id}>
                <td>
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded overflow-hidden mr-3 flex-shrink-0">
                      <img 
                        src={getVehicleImage(record.vehicleId)} 
                        alt={record.vehicleReg}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="font-medium text-gray-900">{record.vehicleReg}</div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <Wrench size={16} className="text-gray-400 mr-2" />
                    <span>{record.type}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <span className="mr-2">{record.date}</span>
                    {getUrgencyIndicator(record.date)}
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <Truck size={16} className="text-gray-400 mr-2" />
                    <span>{record.facility}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    KSH  {"\t"}
                    <span>{record.cost.toLocaleString()}</span>
                  </div>
                </td>
                <td>{getStatusBadge(record.status)}</td>
                <td>
                  <div className="flex items-center space-x-2">
                    <button className="btn btn-outline text-xs py-1 px-2">Details</button>
                    <button className="btn btn-primary text-xs py-1 px-2">Update</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredRecords.length}</span> of <span className="font-medium">{maintenanceRecords.length}</span> records
        </div>
        
        <div className="flex space-x-1">
          <button className="btn btn-outline text-xs py-1 px-3">Previous</button>
          <button className="btn btn-primary text-xs py-1 px-3">1</button>
          <button className="btn btn-outline text-xs py-1 px-3">2</button>
          <button className="btn btn-outline text-xs py-1 px-3">3</button>
          <button className="btn btn-outline text-xs py-1 px-3">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;