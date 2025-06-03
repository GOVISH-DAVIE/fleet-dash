import { useEffect, useState } from 'react';
import { 
  Plus, Search, Filter, Wrench, Calendar, 
  Truck, AlertCircle, DollarSign, ArrowUpDown, ArrowUp, ArrowDown 
} from 'lucide-react'; 
import { vehicles } from '../utils/data';
import { cn } from '../utils/cn';
 
export interface IMaintainace {
  id: number
  vehicleid: number
  type: string
  description: string
  date: string
  cost: number
  status: string
  facility: string
  notes: string
  parts: Parts
  vehicles: Vehicles
}

export interface Parts {
  parts: string[]
}

export interface Vehicles {
  id: number
  registrationnumber: string
  make: string
  model: string
  type: string
  year: number
  status: string
  fuellevel: number
  fuelefficiency: number
  mileage: number
  location: string
  assigneddriver: string
  lastserviced: string
  nextservice: string
  lastinspection: string
  image: string
}

export const fetchMaintenanceRecords = async ({
  page = 1,
  limit = 10,
  search = '',
  sortField = 'date',
  sortDirection = 'asc'
}) => {
  const res = await fetch(
    `https://fleet.intelligentso.com/api/v1/maintenanceRecord?page=${page}&limit=${limit}&search=${search}&sortField=${sortField}&sortDirection=${sortDirection}`
  );

  if (!res.ok) throw new Error('Failed to fetch maintenance records');
  return await res.json();
};

const Maintenance = () => {
  const [records, setRecords] = useState<IMaintainace[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetchMaintenanceRecords({
        page,
        limit,
        search: searchTerm,
        sortField,
        sortDirection
      });
      console.log('====================================');
      console.log(response);
      console.log('====================================');

      let filtered = response.data;
      if (statusFilter) {
        filtered = filtered.filter((record: IMaintainace) => record.status === statusFilter);
      }

      setRecords(filtered);
      setTotal(response.total);
    } catch (error) {
      console.error('Error fetching maintenance records:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, limit, searchTerm, sortField, sortDirection, statusFilter]);

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setPage(1);
  };

  const getSortIcon = (field: string) => {
    if (field !== sortField) return <ArrowUpDown size={16} />;
    return sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

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

  const getUrgencyIndicator = (date: string) => {
    const maintenanceDate = new Date(date);
    const today = new Date();
    const diffDays = Math.ceil((maintenanceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return <AlertCircle size={16} className="text-error" />;
    if (diffDays <= 7) return <AlertCircle size={16} className="text-warning" />;
    return <AlertCircle size={16} className="text-success" />;
  };

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

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th className="cursor-pointer" onClick={() => handleSort('vehicleReg')}><div className="flex items-center">Vehicle {getSortIcon('vehicleReg')}</div></th>
              <th className="cursor-pointer" onClick={() => handleSort('type')}><div className="flex items-center">Service Type {getSortIcon('type')}</div></th>
              <th className="cursor-pointer" onClick={() => handleSort('date')}><div className="flex items-center">Date {getSortIcon('date')}</div></th>
              <th className="cursor-pointer" onClick={() => handleSort('facility')}><div className="flex items-center">Facility {getSortIcon('facility')}</div></th>
              <th className="cursor-pointer" onClick={() => handleSort('cost')}><div className="flex items-center">Cost {getSortIcon('cost')}</div></th>
              <th className="cursor-pointer" onClick={() => handleSort('status')}><div className="flex items-center">Status {getSortIcon('status')}</div></th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            
            {records.map(record => (
              <tr key={record.id}>
                <td><div className="flex items-center"><img src={getVehicleImage(record.vehicleid)} alt="" className="h-9 w-9 rounded mr-3" /><span>{record.vehicles.registrationnumber}</span></div></td>
                <td><div className="flex items-center"><Wrench size={16} className="mr-2" />{record.type}</div></td>
                <td><div className="flex items-center"><Calendar size={16} className="mr-2" />{record.date} {getUrgencyIndicator(record.date)}</div></td>
                <td><div className="flex items-center"><Truck size={16} className="mr-2" />{record.facility}</div></td>
                <td>KSH {record.cost.toLocaleString()}</td>
                <td>{getStatusBadge(record.status)}</td>
                <td><div className="flex space-x-2"><button className="btn btn-outline text-xs">Details</button><button className="btn btn-primary text-xs">Update</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{records.length}</span> of <span className="font-medium">{total}</span> records
        </div>

        <div className="flex space-x-1">
          <button className="btn btn-outline text-xs py-1 px-3" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</button>
          {[...Array(Math.ceil(total / limit)).keys()].slice(0, 5).map((i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`btn text-xs py-1 px-3 ${page === i + 1 ? 'btn-primary' : 'btn-outline'}`}>{i + 1}</button>
          ))}
          <button className="btn btn-outline text-xs py-1 px-3" onClick={() => setPage((prev) => prev + 1)} disabled={page * limit >= total}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;