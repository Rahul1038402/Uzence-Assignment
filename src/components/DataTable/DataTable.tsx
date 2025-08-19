import React, { useState, useMemo, useCallback } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Loader2, Database } from 'lucide-react';
import type { DataTableProps, Column, SortOrder } from './DataTable.types';
import { cn } from '../../utils/cn';

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  rowKey = 'id',
  emptyMessage = 'No data available',
  className,
  maxHeight = '500px',
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    order: SortOrder;
  }>({ key: null, order: null });

  // Generate row key
  const getRowKey = useCallback((record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return String(record[rowKey] ?? index);
  }, [rowKey]);

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.order) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (aValue == null) comparison = -1;
      else if (bValue == null) comparison = 1;
      else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortConfig.order === 'desc' ? -comparison : comparison;
    });
  }, [data, sortConfig]);

  // Handle column sorting
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    setSortConfig(prev => {
      if (prev.key === column.dataIndex) {
        // Sorting: null | ascending | decending | null
        const nextOrder: SortOrder = 
          prev.order === null ? 'asc' : 
          prev.order === 'asc' ? 'desc' : null;
        return { key: nextOrder ? column.dataIndex : null, order: nextOrder };
      }
      return { key: column.dataIndex, order: 'asc' };
    });
  };

  // Handle row selection
  const handleRowSelect = (rowKey: string, record: T) => {
    if (!selectable) return;

    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowKey)) {
      newSelectedRows.delete(rowKey);
    } else {
      newSelectedRows.add(rowKey);
    }

    setSelectedRows(newSelectedRows);

    if (onRowSelect) {
      const selectedRecords = sortedData.filter((record, index) => 
        newSelectedRows.has(getRowKey(record, index))
      );
      onRowSelect(selectedRecords);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (!selectable) return;

    const allRowKeys = sortedData.map((record, index) => getRowKey(record, index));
    const isAllSelected = allRowKeys.every(key => selectedRows.has(key));

    if (isAllSelected) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      setSelectedRows(new Set(allRowKeys));
      onRowSelect?.(sortedData);
    }
  };

  const getSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;

    const isActive = sortConfig.key === column.dataIndex;
    
    if (!isActive) {
      return <ChevronsUpDown className="h-4 w-4 text-gray-400" />;
    }

    return sortConfig.order === 'asc' ? (
      <ChevronUp className="h-4 w-4 text-primary-600" />
    ) : (
      <ChevronDown className="h-4 w-4 text-primary-600" />
    );
  };

  const isAllSelected = sortedData.length > 0 && 
    sortedData.every((record, index) => selectedRows.has(getRowKey(record, index)));
  const isIndeterminate = selectedRows.size > 0 && !isAllSelected;

  if (loading) {
    return (
      <div className={cn('w-full border border-gray-200 rounded-lg dark:border-gray-700', className)}>
        <div className="flex items-center justify-center p-12">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className={cn('w-full border border-gray-200 rounded-lg dark:border-gray-700', className)}>
        <div className="flex items-center justify-center p-12">
          <div className="flex flex-col items-center space-y-4">
            <Database className="h-12 w-12 text-gray-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400">{emptyMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700', className)}>
      <div className="overflow-x-auto" style={{ maxHeight }}>
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400',
                    column.sortable && 'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                  role={column.sortable ? 'button' : undefined}
                  tabIndex={column.sortable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleSort(column);
                    }
                  }}
                  aria-sort={
                    sortConfig.key === column.dataIndex 
                      ? sortConfig.order === 'asc' ? 'ascending' : 'descending'
                      : undefined
                  }
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {sortedData.map((record, index) => {
              const recordKey = getRowKey(record, index);
              const isSelected = selectedRows.has(recordKey);

              return (
                <tr
                  key={recordKey}
                  className={cn(
                    'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
                    isSelected && 'bg-primary-50 dark:bg-primary-900/20',
                    selectable && 'cursor-pointer'
                  )}
                  onClick={() => selectable && handleRowSelect(recordKey, record)}
                  role={selectable ? 'button' : undefined}
                  tabIndex={selectable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (selectable && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleRowSelect(recordKey, record);
                    }
                  }}
                  aria-selected={selectable ? isSelected : undefined}
                >
                  {selectable && (
                    <td className="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleRowSelect(recordKey, record)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => {
                    const value = record[column.dataIndex];
                    const cellContent = column.render 
                      ? column.render(value, record, index)
                      : String(value ?? '');

                    return (
                      <td
                        key={column.key}
                        className={cn(
                          'px-4 py-3 text-sm text-gray-900 dark:text-gray-100',
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right'
                        )}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {selectable && selectedRows.size > 0 && (
        <div className="px-4 py-3 bg-primary-50 border-t border-gray-200 dark:bg-primary-900/20 dark:border-gray-700">
          <p className="text-sm text-primary-700 dark:text-primary-300">
            {selectedRows.size} row{selectedRows.size !== 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  );
}

export default DataTable;