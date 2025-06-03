import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface RouteData {
  route: string;
  count: number;
}

interface TopRoutesCardProps {
  routes: RouteData[];
}
export const TopRoutesSection = () => {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRoutes = async () => {
      try {
        const response = await fetch('https://fleet.intelligentso.com/api/v1/trip/top-routes');
        const result = await response.json();

        if (result.success) {
          setRoutes(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch top routes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRoutes();
  }, []);

  if (loading) {
    return <div className="dashboard-card p-4">Loading top routes...</div>;
  }

  return <TopRoutesCard routes={routes} />;
};

const TopRoutesCard = ({ routes }: TopRoutesCardProps) => {
  // Find the maximum count to calculate percentages
  const maxCount = Math.max(...routes.map(route => route.count));

  return (
    <div className="dashboard-card border-l-accent">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Routes</h3>
        
        <div className="space-y-3">
          {routes.map((route, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin size={16} className="text-primary mr-2" />
                  <span className="text-sm font-medium">{route.route}</span>
                </div>
                <span className="text-sm text-gray-500">{route.count} trips</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-accent h-full rounded-full"
                  style={{ width: `${(route.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRoutesCard;