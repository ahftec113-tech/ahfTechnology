// src/screens/LeadFilterScreen/useLeadFilterScreen.js
import { useState } from 'react';

const initialFilters = {
  source: '',
  systemDefined: [],
  agentWise: '',
  userWise: '',
  statusWise: '',
  dateStatusWise: '',
  action: '',
  createdModified: 'Created Date',
  followUpDate: '',
  sorting: { field: 'Leads', order: 'ASC' },
};

export const useLeadFilterScreen = onApplyFilters => {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleSystemDefined = value => {
    setFilters(prev => ({
      ...prev,
      systemDefined: prev.systemDefined.includes(value)
        ? prev.systemDefined.filter(v => v !== value)
        : [...prev.systemDefined, value],
    }));
  };

  const setSorting = (field, order) => {
    setFilters(prev => ({
      ...prev,
      sorting: { field, order },
    }));
  };

  const applyFilters = () => {
    onApplyFilters?.(filters);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filters,
    updateFilter,
    toggleSystemDefined,
    setSorting,
    applyFilters,
    resetFilters,
  };
};
