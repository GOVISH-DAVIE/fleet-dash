import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FuelData {
  month: string;
  consumption: number;
}

interface FuelConsumptionChartProps {
  data: FuelData[];
}

const FuelConsumptionChart = ({ data }: FuelConsumptionChartProps) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Fuel Consumption (Litres)',
        data: data.map(item => item.consumption),
        backgroundColor: 'rgba(255, 99, 71, 0.7)',
        borderColor: 'rgba(255, 99, 71, 1)',
        borderWidth: 1,
        borderRadius: 4,
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
            return `${context.parsed.y.toLocaleString()} Litres`;
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
    <div className="dashboard-card border-l-secondary">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Fuel Consumption</h3>
        <div className="h-64">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default FuelConsumptionChart;