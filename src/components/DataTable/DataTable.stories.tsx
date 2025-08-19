import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DataTable from './DataTable';
import type { Column } from './DataTable.types';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  avatar?: string;
}

const sampleData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15',
    avatar: '👨‍💼'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-14',
    avatar: '👩‍💻'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@company.com',
    role: 'Manager',
    status: 'inactive',
    lastLogin: '2024-01-10',
    avatar: '👨‍🏭'
  },
  {
    id: 4,
    name: 'Alice Wilson',
    email: 'alice.wilson@company.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-16',
    avatar: '👩‍🔬'
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@company.com',
    role: 'User',
    status: 'inactive',
    lastLogin: '2024-01-08',
    avatar: '👨‍🎨'
  }
];

const basicColumns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true,
  },
];

const advancedColumns: Column<User>[] = [
  {
    key: 'user',
    title: 'User',
    dataIndex: 'name',
    render: (value: User['name'], record: User) => (
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
    render: (value: User['role']) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        value === 'Admin' 
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
    align: 'center',
    render: (value: User['status']) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        value === 'active' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          value === 'active' ? 'bg-green-400' : 'bg-red-400'
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
    align: 'right',
    render: (value: User['lastLogin']) => new Date(value).toLocaleDateString(),
  },
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    selectable: {
      control: { type: 'boolean' },
      description: 'Enable row selection',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    maxHeight: {
      control: { type: 'text' },
      description: 'Maximum height of the table container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    selectable: true,
    onRowSelect: (selectedRows: User[]) => {
      console.log('Selected rows:', selectedRows);
    },
  },
};

export const Loading: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: basicColumns,
    emptyMessage: 'No users found',
  },
};

export const Advanced: Story = {
  args: {
    data: sampleData,
    columns: advancedColumns,
    selectable: true,
  },
};

export const CustomStyling: Story = {
  args: {
    data: sampleData.slice(0, 3),
    columns: advancedColumns,
    selectable: true,
    className: 'shadow-lg',
    maxHeight: '300px',
  },
};

export const AllFeatures: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = React.useState<User[]>([]);
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Selected: {selectedRows.length} row{selectedRows.length !== 1 ? 's' : ''}
        </div>
        <DataTable
          data={sampleData}
          columns={advancedColumns}
          selectable
          onRowSelect={setSelectedRows}
          maxHeight="400px"
        />
      </div>
    );
  },
};