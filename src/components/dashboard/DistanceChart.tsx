import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { useEffect, useState } from 'react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface DistanceData {
  month: string;
  distance: number;
}

interface DistanceChartProps {
  data: DistanceData[];
}

export const DistanceChartWrapper = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistanceData = async () => {
      try {
        const response = await fetch('https://fleet.intelligentso.com/api/v1/trip/distance');
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          const formatted = result.data.map((item: any) => ({
            month: item.month,
            distance: parseFloat(item.distance),
          }));
          setChartData(formatted);
        } else {
          console.warn('Unexpected API response:', result);
        }
      } catch (error) {
        console.error('Failed to fetch trip distance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistanceData();
  }, []);

  if (loading) return <p>Loading distance data...</p>;

  return (
    <div className="p-4">
      <DistanceChart data={chartData} />
    </div>
  );
};

const DistanceChart = ({ data }: DistanceChartProps) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Total Distance (km)',
        data: data.map(item => item.distance),
        borderColor: 'rgb(5, 107, 47)',
        backgroundColor: 'rgba(5, 107, 47, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(5, 107, 47)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: 'Inter',
            size: 12
          }
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        cornerRadius: 4,
        titleFont: {
          family: 'Inter',
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          family: 'Inter',
          size: 13
        },
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y.toLocaleString()} km`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 12
          },
          callback: function(value: any) {
            return value.toLocaleString();
          }
        }
      }
    }
  };

  return (
    <div className="dashboard-card border-l-primary">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Distance Traveled</h3>
        <div className="h-64">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DistanceChart;