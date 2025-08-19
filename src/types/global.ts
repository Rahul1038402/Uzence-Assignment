export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}