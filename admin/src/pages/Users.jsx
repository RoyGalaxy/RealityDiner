import React, { useState, useEffect } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`);
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="p-8 text-white">
                <div className="animate-pulse">Loading users...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-white">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="p-8 text-white">
            <h1 className="text-2xl font-bold mb-6">Users</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Updated</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {users.map((user) => (
                            <tr 
                                key={user._id}
                                className="hover:bg-gray-700 transition-colors"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs rounded-full ${user.isVerified ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {user.isVerified ? 'Verified' : 'Unverified'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(user.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: '2-digit'
                                    })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(user.updatedAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: '2-digit'
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;