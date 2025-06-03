import { useEffect, useState } from 'react';
import {
  Plus, Search, Filter, Download, Truck,
  Calendar, Droplet, ArrowUpDown, ArrowUp, ArrowDown
} from 'lucide-react';
import { cn } from '../utils/cn';
import { IVehicles } from '../interface/Ivehicles';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<IVehicles[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('registrationnumber');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch(`https://fleet.intelligentso.com/api/v1/vehicle?page=${page}&limit=${limit}`);
        const json = await res.json();
        setVehicles(json.data || []);
        setTotalPages(json.totalPages || 1);
        setTotalCount(json.total || 0);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, [page, limit]);

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (field !== sortField) return <ArrowUpDown size={16} />;
    return sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  const filteredVehicles = vehicles
    .filter(vehicle => {
      const matchSearch =
        vehicle.registrationnumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = !statusFilter || vehicle.status.toLowerCase() === statusFilter.toLowerCase();

      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      const valA = a[sortField as keyof typeof a];
      const valB = b[sortField as keyof typeof b];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }

      return 0;
    });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
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

  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(dateObj);
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

      {/* Vehicles Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {[
                { key: 'registrationnumber', label: 'Registration' },
                { key: 'make', label: 'Vehicle' },
                { key: 'type', label: 'Type' },
                { key: 'status', label: 'Status' },
                { key: 'location', label: 'Location' },
                { key: 'lastserviced', label: 'Last Service' },
                { key: 'fuellevel', label: 'Fuel' },
              ].map(col => (
                <th
                  key={col.key}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center">
                    <span>{col.label}</span>
                    {getSortIcon(col.key)}
                  </div>
                </th>
              ))}
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
                    <div className="font-medium text-gray-900">{vehicle.registrationnumber}</div>
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
                    <span className="w-2 h-2 rounded-full bg-primary mr-2" />
                    <span>{vehicle.location}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <span>{formatDate(vehicle.lastserviced)}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <Droplet size={16} className="text-gray-400 mr-2" />
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          vehicle.fuellevel > 50
                            ? "bg-success"
                            : vehicle.fuellevel > 25
                            ? "bg-warning"
                            : "bg-error"
                        )}
                        style={{ width: `${vehicle.fuellevel}%` }}
                      />
                    </div>
                    <span className="ml-2 text-xs">{vehicle.fuellevel}%</span>
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
          Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span> — Showing <span className="font-medium">{vehicles.length}</span> of <span className="font-medium">{totalCount}</span> vehicles
        </div>
        <div className="flex space-x-1">
          <button
            className="btn btn-outline text-xs py-1 px-3"
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="btn btn-disabled text-xs py-1 px-3">{page}</span>
          <button
            className="btn btn-outline text-xs py-1 px-3"
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
