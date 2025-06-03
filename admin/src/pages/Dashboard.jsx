import { Line, Doughnut } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const dailyOrdersData = {
  labels: ['Sun', 'Mon', 'Tue', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      label: 'Daily Orders',
      data: [150, 230, 210, 310, 290, 390],
      borderColor: 'rgb(59, 130, 246)',
      tension: 0.4,
    },
  ],
};

const revenueByRestaurantData = {
  labels: ['Restaurant A', 'Restaurant B', 'Restaurant C', 'Restaurant D'],
  datasets: [
    {
      data: [25000, 18000, 15000, 9890],
      backgroundColor: ['#3B82F6', '#10B981', '#EF4444', '#8B5CF6'],
      borderWidth: 0,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#9CA3AF',
      },
    },
  },
  scales: {
    y: {
      ticks: { color: '#9CA3AF' },
      grid: { color: '#374151' },
    },
    x: {
      ticks: { color: '#9CA3AF' },
      grid: { color: '#374151' },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#9CA3AF',
      },
    },
  },
  cutout: '70%',
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = Cookies.get('adminToken');

        const [metricsResponse, activitiesResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/metrics/dashboard-metrics`, {
            headers: {
              'Authorization': `Bearer ${adminToken}`
            }
          }),
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/metrics/recent-activity`, {
            headers: {
              'Authorization': `Bearer ${adminToken}`
            }
          })
        ]);

        if (!metricsResponse.ok || !activitiesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [metricsData, activitiesData] = await Promise.all([
          metricsResponse.json(),
          activitiesResponse.json()
        ]);
        
        const formattedMetrics = [
          { title: metricsData[0].title, value: metricsData[0].value, color: 'bg-blue-600' },
          { title: metricsData[1].title, value: metricsData[1].value, color: 'bg-green-600' },
          { title: metricsData[2].title, value: metricsData[2].value, color: 'bg-red-600' },
          { title: metricsData[3].title, value: metricsData[3].value, color: 'bg-purple-600' },
        ];
        
        setMetrics(formattedMetrics);
        setActivities(activitiesData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-white">Loading metrics...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className={`${metric.color} rounded-lg p-6 text-white`}
          >
            <h3 className="text-lg font-medium">{metric.title}</h3>
            <p className="mt-2 text-3xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-gray-800 p-6">
          <h3 className="mb-4 text-lg font-medium text-white">Daily Orders</h3>
          <Line options={chartOptions} data={dailyOrdersData} />
        </div>
        <div className="rounded-lg bg-gray-800 p-6">
          <h3 className="mb-4 text-lg font-medium text-white">Revenue by Restaurant</h3>
          <Doughnut options={doughnutOptions} data={revenueByRestaurantData} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg bg-gray-800 p-6">
        <h3 className="mb-4 text-lg font-medium text-white">Recent Activity</h3>
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {activities.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span
                      className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-700"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className="bg-blue-600 flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-gray-800"
                      >
                        <span className="text-white text-sm font-medium">
                          {activity.details.userName.charAt(0)}
                        </span>
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-white">
                          {activity.details.userName} placed an order at {activity.details.restaurantName} for {activity.details.amount}
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-400">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}