import React, { Suspense, lazy } from 'react';
import { AlertCircle, BarChart4, Calendar } from 'lucide-react';
import { ActiveDriver, MonthlyCompletedTrips, MonthlyFuelRecord, TotalVehicles } from '../components/dashcomp';
import RecentAlertsCard from '../components/dashboard/RecentAlertsCard';
import { dashboardStats, recentAlerts } from '../utils/data';

// ✅ Lazy-loaded components
const VehicleStatusCardWrapper = lazy(() => import('../components/dashboard/VehicleStatusCard').then(mod => ({ default: mod.VehicleStatusCardWrapper })));
const FuelChartWrapper = lazy(() => import('../components/dashboard/FuelConsumptionChart').then(mod => ({ default: mod.FuelChartWrapper })));
const DistanceChartWrapper = lazy(() => import('../components/dashboard/DistanceChart').then(mod => ({ default: mod.DistanceChartWrapper })));
const VehicleListWrapper = lazy(() => import('../components/dashboard/VehicleList').then(mod => ({ default: mod.VehicleListWrapper })));
const MaintenanceScheduleCard = lazy(() => import('../components/dashboard/MaintenanceScheduleCard'));
const TopRoutesSection = lazy(() => import('../components/dashboard/TopRoutesCard').then(mod => ({ default: mod.TopRoutesSection })));

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back to Safari Fleet Management System</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <TotalVehicles />
        <ActiveDriver />
        <MonthlyFuelRecord />
        <MonthlyCompletedTrips />
      </div>

      {/* Charts and stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Suspense fallback={<div className="dashboard-card p-4">Loading Distance Chart...</div>}>
          <DistanceChartWrapper />
        </Suspense>
        <Suspense fallback={<div className="dashboard-card p-4">Loading Fuel Chart...</div>}>
          <FuelChartWrapper />
        </Suspense>
      </div>

      {/* Vehicle list */}
      <Suspense fallback={<div className="dashboard-card p-4">Loading Vehicle List...</div>}>
        <VehicleListWrapper />
      </Suspense>

      {/* Status, alerts, and maintenance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense fallback={<div className="dashboard-card p-4">Loading Vehicle Status...</div>}>
          <VehicleStatusCardWrapper />
        </Suspense>

        <RecentAlertsCard alerts={recentAlerts} />

        <Suspense fallback={<div className="dashboard-card p-4">Loading Maintenance...</div>}>
          <MaintenanceScheduleCard />
        </Suspense>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Suspense fallback={<div className="dashboard-card p-4">Loading Top Routes...</div>}>
          <TopRoutesSection />
        </Suspense>

        <div className="dashboard-card border-l-accent">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Fleet Performance</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart4 size={18} className="text-primary mr-2" />
                  <span className="text-sm font-medium">Average Fuel Efficiency</span>
                </div>
                <span className="font-semibold">{dashboardStats.averageFuelEfficiency} km/L</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar size={18} className="text-primary mr-2" />
                  <span className="text-sm font-medium">Upcoming Services</span>
                </div>
                <span className="font-semibold">{dashboardStats.upcomingServices} vehicles</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle size={18} className="text-primary mr-2" />
                  <span className="text-sm font-medium">Active Alerts</span>
                </div>
                <span className="font-semibold">{recentAlerts.length}</span>
              </div>

              <div className="pt-3 mt-3 border-t border-gray-100">
                <button className="btn btn-primary w-full">Generate Fleet Report</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
