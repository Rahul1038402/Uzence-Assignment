import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DataTable from './DataTable';

interface TestData {
  id: number;
  name: string;
  email: string;
  role: string;
}

const mockData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
];

const mockColumns = [
  { key: 'name', title: 'Name', dataIndex: 'name' as keyof TestData, sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' as keyof TestData, sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role' as keyof TestData },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Manager')).toBeInTheDocument();
  });

  it('displays empty state when no data', () => {
    render(<DataTable data={[]} columns={mockColumns} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    render(<DataTable data={mockData} columns={mockColumns} loading />);
    
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('handles column sorting', async () => {
    const user = userEvent.setup();
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    const nameHeader = screen.getByRole('button', { name: /name/i });
    await user.click(nameHeader);
    
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Bob Johnson');
  });

  it('handles row selection', async () => {
    const user = userEvent.setup();
    const onRowSelect = jest.fn();
    
    render(
      <DataTable 
        data={mockData} 
        columns={mockColumns} 
        selectable 
        onRowSelect={onRowSelect}
      />
    );
    
    const firstCheckbox = screen.getAllByRole('checkbox')[1];
    await user.click(firstCheckbox);
    
    expect(onRowSelect).toHaveBeenCalledWith([mockData[0]]);
  });

  it('handles select all functionality', async () => {
    const user = userEvent.setup();
    const onRowSelect = jest.fn();
    
    render(
      <DataTable 
        data={mockData} 
        columns={mockColumns} 
        selectable 
        onRowSelect={onRowSelect}
      />
    );
    
    const selectAllCheckbox = screen.getByLabelText('Select all rows');
    await user.click(selectAllCheckbox);
    
    expect(onRowSelect).toHaveBeenCalledWith(mockData);
  });

  it('renders custom cell content', () => {
    const customColumns = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name' as keyof TestData,
        render: (value: string) => <strong>{value}</strong>
      }
    ];
    
    render(<DataTable data={mockData} columns={customColumns} />);
    
    expect(screen.getByText('John Doe').tagName).toBe('STRONG');
  });
});