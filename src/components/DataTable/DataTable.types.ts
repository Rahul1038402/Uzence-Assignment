export interface Column<T> {
    key: string;
    title: string;
    dataIndex: keyof T;
    sortable?: boolean;
    render?: (value: any, record: T, index: number) => React.ReactNode;
    width?: string | number;
    align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
    selectable?: boolean;
    onRowSelect?: (selectedRows: T[]) => void;
    rowKey?: keyof T | ((record: T) => string);
    emptyMessage?: string;
    className?: string;
    maxHeight?: string;
}

export type SortOrder = 'asc' | 'desc' | null;