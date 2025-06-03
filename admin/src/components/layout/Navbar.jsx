import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';


export default function Navbar() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'New restaurant approval request', time: '5m ago' },
        { id: 2, text: 'Daily revenue report generated', time: '1h ago' },
        { id: 3, text: 'New user complaint received', time: '2h ago' },
    ]);

    // Add ref for click outside detection
    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        Cookies.remove('adminToken');
        window.location.href = '/login';
    };

    return (
        <nav className="sticky top-0 z-40 backdrop-blur-sm bg-gray-900/90 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-700">
                        <h1 className="text-white font-bold text-sm tracking-wider mr-10">RealityDiner</h1>
                    </div>
                    <div className="flex-1">
                        <form className="relative max-w-lg" action="#" method="GET">
                            <label htmlFor="search-field" className="sr-only">
                                Search
                            </label>
                            <div className="relative">
                                <MagnifyingGlassIcon
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <input
                                    id="search-field"
                                    className="block w-full rounded-full border-0 bg-gray-800 py-2 pl-10 pr-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Search..."
                                    type="search"
                                    name="search"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center gap-x-4">
                        {/* Notification dropdown */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                type="button"
                                className="relative rounded-full p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                <span className="sr-only">View notifications</span>
                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            {showNotifications && (
                                <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-lg bg-gray-900 shadow-lg ring-1 ring-gray-500 focus:outline-none transform opacity-100 scale-100 transition-all duration-200">
                                    <div className="p-2 space-y-1">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className="px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer transition-colors"
                                            >
                                                <p className="text-sm text-gray-200 font-medium">{notification.text}</p>
                                                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile dropdown */}
                        <div className="relative flex-shrink-0" ref={profileRef}>
                            <button
                                type="button"
                                className="relative flex rounded-full ring-2 ring-transparent hover:ring-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                id="user-menu-button"
                                onClick={() => setShowProfileDropdown((prev) => !prev)}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full object-cover"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="User profile"
                                />
                            </button>
                            {showProfileDropdown && (
                                <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-lg bg-gray-900 shadow-lg ring-1 ring-gray-500 focus:outline-none transform opacity-100 scale-100 transition-all duration-200">
                                    <div className="py-2">
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
                                            onClick={() => {
                                                window.location.href = '/profile';
                                                setShowProfileDropdown(false);
                                            }}
                                        >
                                            Profile
                                        </button>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}