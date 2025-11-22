import { FC } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryPieChartProps {
  categories: { name: string; revenue: number }[];
}

const CategoryPieChart: FC<CategoryPieChartProps> = ({ categories }) => {
  const chartData = {
    labels: categories.map(c => c.name),
    datasets: [
      {
        label: 'Выручка по категориям',
        data: categories.map(c => c.revenue),
        backgroundColor: [
          '#3B82F6', // синий
          '#10B981', // зелёный
          '#F59E0B', // оранжевый
          '#EF4444', // красный
          '#8B5CF6', // фиолетовый
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed;
            const total = categories.reduce((sum, c) => sum + c.revenue, 0);
            const percent = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value.toFixed(0)} с (${percent}%)`;
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default CategoryPieChart;
