import { useEffect, useState } from 'react';
import {
  Plus, Search, Filter, Download, Star,
  CalendarClock, TrendingUp, ArrowUpDown, ArrowUp, ArrowDown
} from 'lucide-react';
import axios, { } from 'axios'; 
import { IDriver } from '../interface/IDriver';

const Drivers = () => {
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [limit] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://fleet.intelligentso.com/api/v1/driver?page=${page}&limit=${limit}`);
        setDrivers(res.data.data);
        setTotal(res.data.total || res.data.data.length);
        setError('');
      } catch (err) {
        setError(`Failed to load drivers: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, [page, limit]);

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (field !== sortField) return <ArrowUpDown size={16} />;
    return sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  const filteredDrivers = drivers
    .filter(driver => {
      const matchesSearch = (
        driver.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.licensenumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStatus = !statusFilter || driver.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const fieldA = a[sortField as keyof IDriver];
      const fieldB = b[sortField as keyof IDriver];

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
      }

      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      }

      return 0;
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return <span className="badge badge-success">Available</span>;
      case 'Completed':
        return <span className="badge badge-primary">On Duty</span>;
      case 'Inactive':
        return <span className="badge badge-neutral">Off Duty</span>;
      case 'In Progress':
        return <span className="badge badge-warning">On Leave</span>;
      default:
        return <span className="badge badge-neutral">IN Active</span>;
    }
  };

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={16} className="text-accent fill-accent" />);
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="relative">
          <Star size={16} className="text-gray-300 fill-gray-300" />
          <span className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star size={16} className="text-accent fill-accent" />
          </span>
        </span>
      );
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300 fill-gray-300" />);
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm">{rating?.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-800">Drivers</h1>
          <p className="text-gray-500 mt-1">Manage your fleet drivers</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline flex items-center gap-2">
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <Plus size={16} />
            <span>Add Driver</span>
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
            placeholder="Search drivers..."
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
            <option value="available">Available</option>
            <option value="on-duty">On Duty</option>
            <option value="off-duty">Off Duty</option>
            <option value="on-leave">On Leave</option>
          </select>

          <button className="btn btn-outline flex items-center gap-2">
            <Filter size={16} />
            <span className="hidden sm:inline">More Filters</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                {['name', 'licenseNumber', 'status', 'rating', 'trips', 'licenseExpiry'].map(field => (
                  <th
                    key={field}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort(field)}
                  >
                    <div className="flex items-center">
                      <span>{field === 'name' ? 'Driver' : field}</span>
                      {getSortIcon(field)}
                    </div>
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDrivers.map(driver => (
                <tr key={driver.id}>
                  <td>
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full overflow-hidden mr-3 flex-shrink-0">
                        <img
                          src={driver.avatar || '/default-avatar.png'}
                          alt={driver.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{driver.name}</div>
                        <div className="text-xs text-gray-500">{driver.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>{driver.licensenumber}</td>
                  <td>{getStatusBadge(driver.status)}</td>
                  <td>{renderRating(driver.rating)}</td>
                  <td>
                    <div className="flex items-center">
                      <TrendingUp size={16} className="text-gray-400 mr-2" />
                      <span>{driver.trips.length} trips</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <CalendarClock size={16} className="text-gray-400 mr-2" />
                      <span>{driver.licenseexpiry}</span>
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
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing page <span className="font-medium">{page + 1}</span> of{' '}
          <span className="font-medium">{Math.ceil(total / limit)}</span>
        </div>

        <div className="flex space-x-1">
          <button
            className="btn btn-outline text-xs py-1 px-3"
            disabled={page === 0}
            onClick={() => setPage(p => Math.max(p - 1, 0))}
          >
            Previous
          </button>
          <button className="btn btn-outline text-xs py-1 px-3" onClick={() => setPage(p => p + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drivers;
