import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, X, LayoutDashboard, Truck, Users, Wrench,
  FileBarChart, Settings, LogOut, Bell, Search, 
  ChevronDown, Sun
} from 'lucide-react';
import { cn } from '../utils/cn';
import logo from '../assets/logo';

interface NavItemProps {
  to: string;
  icon: JSX.Element;
  label: string;
  notifications?: number;
}

const NavItem = ({ to, icon, label, notifications }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <NavLink 
      to={to} 
      className={cn(
        'nav-item',
        isActive && 'active'
      )}
    >
      {icon}
      <span>{label}</span>
      {notifications && (
        <span className="ml-auto inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-secondary rounded-full">
          {notifications}
        </span>
      )}
    </NavLink>
  );
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 flex-shrink-0 transform flex flex-col bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8" dangerouslySetInnerHTML={{ __html: logo }} />
            <span className="ml-2 text-xl font-semibold text-gray-800">Safari Fleet</span>
          </div>
          <button 
            className="p-1 rounded-md lg:hidden hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Pattern divider */}
        <div className="pattern-divider"></div>
        
        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          <NavItem 
            to="/" 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
          />
          <NavItem 
            to="/vehicles" 
            icon={<Truck size={20} />} 
            label="Vehicles" 
            notifications={3}
          />
          <NavItem 
            to="/drivers" 
            icon={<Users size={20} />} 
            label="Drivers" 
          />
          <NavItem 
            to="/maintenance" 
            icon={<Wrench size={20} />} 
            label="Maintenance" 
            notifications={2}
          />
          <NavItem 
            to="/reports" 
            icon={<FileBarChart size={20} />} 
            label="Reports" 
          />
          <NavItem 
            to="/settings" 
            icon={<Settings size={20} />} 
            label="Settings" 
          />
        </nav>
        
        {/* Sidebar footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <img 
              src="https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover border-2 border-primary"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">James Mwangi</p>
              <p className="text-xs text-gray-500">Fleet Manager</p>
            </div>
            <button className="ml-auto p-1 rounded-md hover:bg-gray-100">
              <LogOut size={18} className="text-gray-500" />
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-gray-200">
          <div className="flex items-center lg:hidden">
            <button 
              className="p-1 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
          
          {/* Search */}
          <div className="flex-1 max-w-md ml-4 lg:ml-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input 
                type="text"
                placeholder="Search..." 
                className="input pl-10"
              />
            </div>
          </div>
          
          <div className="hidden md:block mr-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">{formatTime(currentTime)}</p>
              <p className="text-xs text-gray-500">{formatDate(currentTime)}</p>
            </div>
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-0 right-0 block w-2 h-2 bg-secondary rounded-full"></span>
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <Sun size={20} className="text-gray-600" />
            </button>
            <div className="hidden sm:block h-6 w-px bg-gray-200"></div>
            <div className="hidden sm:flex items-center">
              <img 
                src="https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 hidden lg:block">James Mwangi</span>
              <ChevronDown size={16} className="ml-1 text-gray-500 hidden lg:block" />
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;