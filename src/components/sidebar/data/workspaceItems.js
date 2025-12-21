// src/components/sidebar/data/workspaceItems.js
import { 
  Layers, 
  FileText, 
  Package, 
  Calendar,
  BarChart3,
  BookOpen,
  Building2,
  GitBranch,
  Activity,
  PieChart,
  UserPlus,
  Briefcase,
  Phone,
  DollarSign
} from 'lucide-react';

// 🆕 DEFAULT OPTIONS (for work/business users) - EMPTY for now
export const defaultWorkspaceItems = [
  // No items - will only show boards from backend
];

// 🆕 NON-PROFIT SPECIFIC OPTIONS WITH SUB-ITEMS AND THEIR ICONS
export const nonprofitWorkspaceItems = [
  { 
    label: 'Grants Management',
    icon: null, // No icon for main workspace
    subItems: [
      { label: 'Grants Pipeline', icon: GitBranch },
      { label: 'Getting Started', icon: BookOpen },
      { label: 'Grant Providers', icon: Building2 },
      { label: 'Grants Dashboard', icon: BarChart3 }
    ]
  },
  { 
    label: 'Donor Management',
    icon: null, // No icon for main workspace
    subItems: [
      { label: 'Donor Donations', icon: DollarSign },
      { label: 'Donor Activities', icon: Activity },
      { label: 'Donor Dashboard', icon: PieChart },
      { label: 'Getting Started', icon: BookOpen }
    ]
  },
  { 
    label: 'monday Fundraising',
    icon: null, // No icon for main workspace
    subItems: [
      { label: 'Project Management', icon: Briefcase },
      { label: 'Contacts', icon: Phone },
      { label: 'Learning Center', icon: BookOpen }
    ]
  },
  { 
    label: 'Volunteer Registration Management',
    icon: null, // No icon for main workspace
    subItems: [
      { label: 'Volunteer Registration', icon: UserPlus },
      { label: 'Volunteer Activities', icon: Activity },
      { label: 'Learning Center', icon: BookOpen }
    ]
  },
];

// 🆕 MAIN FUNCTION - Returns items based on category
export const getWorkspaceItems = (category) => {
  console.log('🔍 getWorkspaceItems called with category:', category);
  
  if (category === 'ngo' || category === 'nonprofit') {
    console.log('✅ Returning NON-PROFIT items');
    return nonprofitWorkspaceItems;
  }
  
  console.log('✅ Returning DEFAULT items (empty - only boards)');
  return defaultWorkspaceItems;
};

// 🆕 DEFAULT EXPORT (for backwards compatibility)
export default defaultWorkspaceItems;