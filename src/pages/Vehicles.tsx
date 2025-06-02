import { useState } from 'react';
import { 
  Plus, Search, Filter, Download, Truck, 
  Calendar, Droplet, ArrowUpDown, ArrowUp, ArrowDown
} from 'lucide-react';
import { vehicles } from '../utils/data';
import { cn } from '../utils/cn';

const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('registrationNumber');
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
  
  // Filter and sort vehicles
  const filteredVehicles = vehicles
    .filter(vehicle => {
      const matchesSearch = 
        vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.location.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesStatus = !statusFilter || vehicle.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
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
      
      if (fieldA instanceof Date && fieldB instanceof Date) {
        return sortDirection === 'asc' 
          ? fieldA.getTime() - fieldB.getTime() 
          : fieldB.getTime() - fieldA.getTime();
      }
      
      return 0;
    });
    
  // Get status badge
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-800">Vehicles</h1>
          <p className="text-gray-500 mt-1">Manage your fleet of vehicles</p>
        </div>
        
        <div className="flex gap-2">
          <button className="btn btn-outline flex items-center gap-2">
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <Plus size={16} />
            <span>Add Vehicle</span>
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
            placeholder="Search vehicles..."
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
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <button className="btn btn-outline flex items-center gap-2">
            <Filter size={16} />
            <span className="hidden sm:inline">More Filters</span>
          </button>
        </div>
      </div>
      
      {/* Vehicles table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('registrationNumber')}
              >
                <div className="flex items-center">
                  <span>Registration</span>
                  {getSortIcon('registrationNumber')}
                </div>
              </th>
              <th 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('make')}
              >
                <div className="flex items-center">
                  <span>Vehicle</span>
                  {getSortIcon('make')}
                </div>
              </th>
              <th 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center">
                  <span>Type</span>
                  {getSortIcon('type')}
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
              <th 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('location')}
              >
                <div className="flex items-center">
                  <span>Location</span>
                  {getSortIcon('location')}
                </div>
              </th>
              <th 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('lastServiced')}
              >
                <div className="flex items-center">
                  <span>Last Service</span>
                  {getSortIcon('lastServiced')}
                </div>
              </th>
              <th 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('fuelLevel')}
              >
                <div className="flex items-center">
                  <span>Fuel</span>
                  {getSortIcon('fuelLevel')}
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredVehicles.map(vehicle => (
              <tr key={vehicle.id}>
                <td>
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded overflow-hidden mr-3 flex-shrink-0">
                      <img 
                        src={vehicle.image} 
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="font-medium text-gray-900">{vehicle.registrationNumber}</div>
                  </div>
                </td>
                <td>
                  <div className="text-sm text-gray-900">{vehicle.make}</div>
                  <div className="text-xs text-gray-500">{vehicle.model} ({vehicle.year})</div>
                </td>
                <td>
                  <div className="flex items-center">
                    <Truck size={16} className="text-gray-400 mr-2" />
                    <span>{vehicle.type}</span>
                  </div>
                </td>
                <td>{getStatusBadge(vehicle.status)}</td>
                <td>
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                    <span>{vehicle.location}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <span>{formatDate(vehicle.lastServiced)}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <Droplet size={16} className="text-gray-400 mr-2" />
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
                    <span className="ml-2 text-xs">{vehicle.fuelLevel}%</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center space-x-2">
                    <button className="btn btn-outline text-xs py-1 px-2">Details</button>
                    <button className="btn btn-primary text-xs py-1 px-2">Assign</button>
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
          Showing <span className="font-medium">{filteredVehicles.length}</span> of <span className="font-medium">{vehicles.length}</span> vehicles
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

export default Vehicles;