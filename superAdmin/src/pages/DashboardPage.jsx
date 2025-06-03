import React from 'react';
import SalesBarChart from '../components/charts/SalesBarChart';
import { FiUsers, FiDollarSign, FiShoppingBag, FiActivity } from 'react-icons/fi';
import UserActivityChart from '../components/charts/UserActivityChart';

function DashboardPage() {
  const stats = [
    { title: 'Total Revenue', value: '$124,563', change: '+12.5%', icon: <FiDollarSign className="w-6 h-6" /> },
    { title: 'Active Users', value: '2,345', change: '+8.2%', icon: <FiUsers className="w-6 h-6" /> },
    { title: 'Total Orders', value: '12,543', change: '+23.1%', icon: <FiShoppingBag className="w-6 h-6" /> },
    { title: 'Conversion Rate', value: '3.2%', change: '+2.4%', icon: <FiActivity className="w-6 h-6" /> },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600">Welcome back, Super Admin</p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-white text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50">
              Download Report
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              New Analysis
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                </div>
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Revenue Overview</h2>
                <p className="text-sm text-slate-500 mt-1">Track your earnings over time</p>
              </div>
              <div className="relative">
                <select className="appearance-none bg-white pl-4 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <SalesBarChart />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-900">User Activity</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm border rounded-full hover:bg-slate-50">Daily</button>
                <button className="px-3 py-1 text-sm border rounded-full bg-indigo-50 text-indigo-600">Weekly</button>
                <button className="px-3 py-1 text-sm border rounded-full hover:bg-slate-50">Monthly</button>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg h-[300px] overflow-hidden">
              <UserActivityChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;