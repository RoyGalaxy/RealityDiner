import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const UserActivityChart = () => {
  // Sample data for the last 7 days
  const generateSampleData = () => {
    const dates = [];
    const activeUsers = [];
    const newUsers = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      activeUsers.push(Math.floor(Math.random() * (1000 - 500) + 500));
      newUsers.push(Math.floor(Math.random() * (200 - 50) + 50));
    }
    
    return { dates, activeUsers, newUsers };
  };

  const sampleData = generateSampleData();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 10,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: true,
        text: 'Daily User Activity',
        font: {
          size: 14,
          weight: 'bold'
        },
        padding: 10
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ddd',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        title: {
          display: true,
          text: 'Number of Users',
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 11
          }
        }
      }
    }
  };

  const chartData = {
    labels: sampleData.dates,
    datasets: [
      {
        label: 'Active Users',
        data: sampleData.activeUsers,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5
      },
      {
        label: 'New Users',
        data: sampleData.newUsers,
        fill: true,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5
      }
    ]
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '300px',
      padding: '15px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      <Line options={chartOptions} data={chartData} />
    </div>
  );
};

export default UserActivityChart;
