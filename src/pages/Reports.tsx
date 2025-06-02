import { FileBarChart, Calendar, Download, ArrowDown, Filter, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { monthlyFuelData, monthlyDistanceData, vehicleTypesData } from '../utils/data';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Reports = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [reportType, setReportType] = useState('all');
  
  // Vehicle types doughnut chart data
  const vehicleTypesChartData = {
    labels: vehicleTypesData.map(item => item.type),
    datasets: [
      {
        data: vehicleTypesData.map(item => item.count),
        backgroundColor: [
          'rgba(5, 107, 47, 0.7)',
          'rgba(255, 99, 71, 0.7)',
          'rgba(255, 215, 0, 0.7)',
          'rgba(46, 139, 87, 0.7)',
          'rgba(255, 165, 0, 0.7)',
        ],
        borderColor: [
          'rgb(5, 107, 47)',
          'rgb(255, 99, 71)',
          'rgb(255, 215, 0)',
          'rgb(46, 139, 87)',
          'rgb(255, 165, 0)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Fuel consumption chart data
  const fuelChartData = {
    labels: monthlyFuelData.map(item => item.month),
    datasets: [
      {
        label: 'Fuel Consumption (Litres)',
        data: monthlyFuelData.map(item => item.consumption),
        backgroundColor: 'rgba(255, 99, 71, 0.7)',
        borderColor: 'rgb(255, 99, 71)',
        borderWidth: 1,
      },
    ],
  };
  
  // Distance chart data
  const distanceChartData = {
    labels: monthlyDistanceData.map(item => item.month),
    datasets: [
      {
        label: 'Distance Traveled (km)',
        data: monthlyDistanceData.map(item => item.distance),
        backgroundColor: 'rgba(5, 107, 47, 0.7)',
        borderColor: 'rgb(5, 107, 47)',
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };
  
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };
  
  const reportTemplates = [
    {
      id: 'fuel',
      name: 'Fuel Consumption Report',
      description: 'Analysis of fuel usage, costs, and efficiency',
      icon: <FileBarChart size={32} className="text-secondary" />
    },
    {
      id: 'maintenance',
      name: 'Maintenance Report',
      description: 'Vehicle maintenance history and upcoming services',
      icon: <FileBarChart size={32} className="text-warning" />
    },
    {
      id: 'driver',
      name: 'Driver Performance Report',
      description: 'Driver metrics, ratings, and trip history',
      icon: <FileBarChart size={32} className="text-success" />
    },
    {
      id: 'vehicle',
      name: 'Vehicle Utilization Report',
      description: 'Vehicle usage, availability, and performance metrics',
      icon: <FileBarChart size={32} className="text-primary" />
    },
    {
      id: 'cost',
      name: 'Cost Analysis Report',
      description: 'Breakdown of all fleet-related expenses',
      icon: <FileBarChart size={32} className="text-error" />
    },
    {
      id: 'trip',
      name: 'Trip Summary Report',
      description: 'Comprehensive data on all fleet trips',
      icon: <FileBarChart size={32} className="text-accent" />
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-800">Reports</h1>
          <p className="text-gray-500 mt-1">Generate and view fleet reports</p>
        </div>
      </div>
      
      {/* Report filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select 
              id="dateRange" 
              className="select" 
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
            >
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="ytd">Year to Date</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select 
              id="reportType" 
              className="select" 
              value={reportType}
              onChange={e => setReportType(e.target.value)}
            >
              <option value="all">All Reports</option>
              <option value="fuel">Fuel Reports</option>
              <option value="maintenance">Maintenance Reports</option>
              <option value="driver">Driver Reports</option>
              <option value="vehicle">Vehicle Reports</option>
              <option value="cost">Cost Reports</option>
            </select>
          </div>
          
          <div className="flex items-end gap-2 ml-auto">
            <button className="btn btn-outline flex items-center gap-2">
              <Filter size={16} />
              <span>More Filters</span>
            </button>
            <button className="btn btn-outline flex items-center gap-2">
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            <button className="btn btn-primary flex items-center gap-2">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Fleet Composition</h3>
          <div className="h-80">
            <Doughnut data={vehicleTypesChartData} options={doughnutOptions} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Distance Traveled</h3>
          <div className="h-80">
            <Bar data={distanceChartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Fuel Consumption</h3>
          <div className="h-80">
            <Bar data={fuelChartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-sm font-medium">Total Distance</span>
              <span className="font-semibold">78,456 km</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-sm font-medium">Total Fuel Consumption</span>
              <span className="font-semibold">5,437 Litres</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-sm font-medium">Average Fuel Economy</span>
              <span className="font-semibold">14.4 km/L</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-sm font-medium">Total Maintenance Cost</span>
              <span className="font-semibold">KSh 287,500</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-sm font-medium">Completed Trips</span>
              <span className="font-semibold">342</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Active Vehicles</span>
              <span className="font-semibold">17 / 20</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Report templates */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Templates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTemplates.map(template => (
            <div key={template.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start">
                <div className="mr-4">{template.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-800">{template.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-400 mr-2" />
                  <span className="text-xs text-gray-500">Last generated: 2 days ago</span>
                </div>
                <button className="btn btn-outline text-xs py-1 px-2 flex items-center gap-1">
                  <ArrowDown size={14} />
                  <span>Generate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;