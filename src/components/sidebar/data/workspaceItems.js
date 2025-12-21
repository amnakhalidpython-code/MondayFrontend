// src/components/sidebar/data/workspaceItems.js
import { Layers, FileText, Heart, Users, DollarSign, Package, TrendingUp } from 'lucide-react';

// 🆕 DEFAULT OPTIONS (for work/business users)
export const defaultWorkspaceItems = [
  { label: 'Main Workspace', icon: Layers },
  { label: 'Projects', icon: Package },
  { label: 'Tasks', icon: FileText },
  { label: 'Calendar', icon: Layers },
];

// 🆕 NON-PROFIT SPECIFIC OPTIONS
export const nonprofitWorkspaceItems = [
  { label: 'Grants Pipeline', icon: TrendingUp },
  { label: 'Getting Started', icon: FileText },
  { label: 'Grant Providers', icon: Layers },
  { label: 'Grants Dashboard', icon: Layers },
  { label: 'Donors', icon: Heart },
  { label: 'Volunteers', icon: Users },
  { label: 'Fundraising', icon: DollarSign },
];

// 🆕 MAIN FUNCTION - Returns items based on category
export const getWorkspaceItems = (category) => {
  console.log('🔍 getWorkspaceItems called with category:', category);
  
  if (category === 'ngo' || category === 'nonprofit') {
    console.log('✅ Returning NON-PROFIT items');
    return nonprofitWorkspaceItems;
  }
  
  console.log('✅ Returning DEFAULT items');
  return defaultWorkspaceItems;
};

// 🆕 DEFAULT EXPORT (for backwards compatibility)
export default defaultWorkspaceItems;