import { Status } from '../data/mockData';

export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000000) {
    return `₦${(amount / 1000000000).toFixed(1)}B`;
  }
  if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(1)}M`;
  }
  return `₦${amount.toLocaleString()}`;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const getStatusColor = (status: Status): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-amber-500';
    case 'delayed':
      return 'bg-red-500';
    case 'not-started':
      return 'bg-gray-400';
    default:
      return 'bg-gray-400';
  }
};

export const getStatusTextColor = (status: Status): string => {
  switch (status) {
    case 'completed':
      return 'text-green-600';
    case 'in-progress':
      return 'text-amber-600';
    case 'delayed':
      return 'text-red-600';
    case 'not-started':
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
};

export const getStatusBgColor = (status: Status): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-50 border-green-200';
    case 'in-progress':
      return 'bg-amber-50 border-amber-200';
    case 'delayed':
      return 'bg-red-50 border-red-200';
    case 'not-started':
      return 'bg-gray-50 border-gray-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

export const getStatusLabel = (status: Status): string => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in-progress':
      return 'In Progress';
    case 'delayed':
      return 'Delayed';
    case 'not-started':
      return 'Not Started';
    default:
      return 'Unknown';
  }
};
