import { useState } from 'react';
import DataTable from '../components/DataTable';

const sampleUsers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@company.com',
        role: 'Admin',
        status: 'active',
        avatar: '👨‍💼',
        createdAt: '2024-01-01',
        lastLogin: '2024-01-15'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        role: 'Manager',
        status: 'active',
        avatar: '👩‍💻',
        createdAt: '2024-01-02',
        lastLogin: '2024-01-14'
    },
    {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob.johnson@company.com',
        role: 'User',
        status: 'inactive',
        avatar: '👨‍🏭',
        createdAt: '2024-01-03',
        lastLogin: '2024-01-10'
    },
    {
        id: 4,
        name: 'Alice Wilson',
        email: 'alice.wilson@company.com',
        role: 'User',
        status: 'active',
        avatar: '👩‍🔬',
        createdAt: '2024-01-04',
        lastLogin: '2024-01-16'
    },
    {
        id: 5,
        name: 'Charlie Brown',
        email: 'charlie.brown@company.com',
        role: 'Manager',
        status: 'active',
        avatar: '👨‍🎨',
        createdAt: '2024-01-05',
        lastLogin: '2024-01-17'
    },
    {
        id: 6,
        name: 'Diana Prince',
        email: 'diana.prince@company.com',
        role: 'User',
        status: 'inactive',
        avatar: '👩‍⚕️',
        createdAt: '2024-01-06',
        lastLogin: '2024-01-12'
    }
];

const columns = [
    {
        key: 'user',
        title: 'User',
        dataIndex: 'name',
        sortable: true,
        render: (value, record) => (
            <div className="flex items-center space-x-3">
                <div className="text-2xl">{record.avatar}</div>
                <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{value}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{record.email}</div>
                </div>
            </div>
        ),
    },
    {
        key: 'role',
        title: 'Role',
        dataIndex: 'role',
        sortable: true,
        render: (value) => (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${value === 'Admin'
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                : value === 'Manager'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                {value}
            </span>
        ),
    },
    {
        key: 'status',
        title: 'Status',
        dataIndex: 'status',
        sortable: true,
        align: 'center' as const,
        render: (value) => (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${value === 'active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${value === 'active' ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                {value}
            </span>
        ),
    },
    {
        key: 'lastLogin',
        title: 'Last Login',
        dataIndex: 'lastLogin',
        sortable: true,
        align: 'right' as const,
        render: (value) => value ? new Date(value).toLocaleDateString() : 'Never',
    },
];

export const Datatable_component = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [singleSelectedUser, setSingleSelectedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showEmpty, setShowEmpty] = useState(false);
    const [selectionMode, setSelectionMode] = useState('multiple');

    const filteredUsers = showEmpty ? [] : sampleUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLoadingDemo = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    const handleSelectionModeChange = (mode) => {
        setSelectionMode(mode);
        setSelectedUsers([]);
        setSingleSelectedUser(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
            <section id="datatable" className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 scroll-mt-24">
                <h2 className="text-4xl text-purple-600 [text-shadow:0_0_8px_rgba(167,139,250,0.4)] text-center font-bold mb-12">
                    DataTable Component
                </h2>

                {/* Demo Controls */}
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Demo Controls
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Loading button */}
                        <button
                            onClick={handleLoadingDemo}
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors w-full"
                        >
                            {isLoading ? "Loading..." : "Demo Loading State"}
                        </button>

                        {/* Empty state button */}
                        <button
                            onClick={() => setShowEmpty(!showEmpty)}
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors w-full"
                        >
                            {showEmpty ? "Show Data" : "Demo Empty State"}
                        </button>

                        {/* Selection Mode */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Selection Mode:
                            </label>
                            <select
                                value={selectionMode}
                                onChange={(e) => handleSelectionModeChange(e.target.value)}
                                className="mt-1 sm:mt-0 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-full"
                            >
                                <option value="multiple">Multiple Selection</option>
                                <option value="single">Single Selection</option>
                            </select>
                        </div>

                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 w-full"
                        />
                    </div>
                </div>


                {/* Selection Summary */}
                <div className="flex justify-between items-center mb-6">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        {!showEmpty && !isLoading && (
                            <>Total: {filteredUsers.length} users</>
                        )}
                    </div>

                    {selectionMode === 'multiple' && selectedUsers.length > 0 && (
                        <div className="text-sm font-medium text-purple-600 dark:text-purple-400">
                            {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                        </div>
                    )}

                    {selectionMode === 'single' && singleSelectedUser && (
                        <div className="text-sm font-medium text-purple-600 dark:text-purple-400">
                            Selected: {singleSelectedUser.name}
                        </div>
                    )}
                </div>

                {/* Main DataTable */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        {selectionMode === 'single' ? 'Single Selection Mode' : 'Multiple Selection Mode'}
                    </h3>

                    <DataTable
                        data={filteredUsers}
                        columns={columns}
                        loading={isLoading}
                        selectable={selectionMode === 'single' ? false : true}
                        onRowSelect={selectionMode === 'single' ? setSingleSelectedUser : setSelectedUsers}
                        emptyMessage={
                            searchQuery && !showEmpty
                                ? `No users found matching "${searchQuery}"`
                                : showEmpty
                                    ? "No users available - this is the empty state demo"
                                    : "No users available"
                        }
                        className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                    />
                </div>

                {/* Additional Examples */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Loading State Demo */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Loading State</h3>
                        <DataTable
                            data={[]}
                            columns={columns}
                            loading={true}
                            emptyMessage="Loading users..."
                            className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                        />
                    </div>

                    {/* Empty State Demo */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Empty State</h3>
                        <DataTable
                            data={[]}
                            columns={columns}
                            emptyMessage="No data available"
                            className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                        />
                    </div>
                </div>

                {/* Search Results */}
                {searchQuery && !showEmpty && (
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                        Showing {filteredUsers.length} of {sampleUsers.length} users for "{searchQuery}"
                    </div>
                )}
            </section>
        </div>
    );
};