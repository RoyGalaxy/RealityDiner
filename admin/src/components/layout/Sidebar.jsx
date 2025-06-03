import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  UsersIcon,
  ExclamationCircleIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/admin/dashboard' },
  { name: 'Admins', icon: UserGroupIcon, href: '/admin/admins' },
  { name: 'Restaurants', icon: BuildingStorefrontIcon, href: '/admin/restaurants' },
  { name: 'Users', icon: UsersIcon, href: '/admin/users' },
//   { name: 'Complaints', icon: ExclamationCircleIcon, href: '/admin/complaints' },
//   { name: 'Analytics', icon: ChartBarIcon, href: '/admin/analytics' },
//   { name: 'Settings', icon: Cog6ToothIcon, href: '/admin/settings' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen flex-col bg-gray-900 w-24 fixed left-0 top-0 border-r border-gray-700">
      <div className="flex h-16 shrink-0 items-center justify-center border-b border-gray-700">
        {/* <h1 className="text-white font-bold text-sm tracking-tight">realityDiner</h1> */}
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-2 py-4">
          <li>
            <ul role="list" className="space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`
                        group flex flex-col gap-2 items-center p-3 rounded-lg transition-all duration-200
                        ${isActive
                          ? 'text-white bg-gray-800 shadow-lg'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }
                      `}
                    >
                      <item.icon 
                        className={`h-6 w-6 shrink-0 transition-transform group-hover:scale-110 
                        ${isActive ? 'text-blue-400' : ''}`} 
                        aria-hidden="true" 
                      />
                      <span className="text-xs font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}