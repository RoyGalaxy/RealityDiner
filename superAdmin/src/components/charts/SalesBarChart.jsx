import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchSalesData } from '../../services/api'; // Import the mock API function

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesBarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchSalesData();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
        // Handle error appropriately in a real app
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []); // Empty dependency array means this effect runs once on mount

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Sales Data (Dynamic)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return <div className="h-64 flex items-center justify-center"><p>Loading chart data...</p></div>;
  }

  if (!chartData) {
    return <div className="h-64 flex items-center justify-center"><p>No data available to display chart.</p></div>;
  }

  return <Bar data={chartData} options={options} />;
};

export default SalesBarChart;