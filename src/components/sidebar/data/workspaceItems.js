// src/components/sidebar/data/workspaceItems.js
import { 
  Layers, 
  FileText, 
  Heart, 
  Users, 
  DollarSign, 
  Package, 
  TrendingUp,
  BarChart3,
  BookOpen,
  Building2,
  GitBranch,
  Activity,
  PieChart,
  UserPlus,
  Calendar,
  Target,
  Briefcase,
  Phone
} from 'lucide-react';

// 🆕 DEFAULT OPTIONS (for work/business users)
export const defaultWorkspaceItems = [
  { label: 'Main Workspace', icon: Layers },
  { label: 'Projects', icon: Package },
  { label: 'Tasks', icon: FileText },
  { label: 'Calendar', icon: Calendar },
];

// 🆕 NON-PROFIT SPECIFIC OPTIONS WITH SUB-ITEMS AND THEIR ICONS
export const nonprofitWorkspaceItems = [
  { 
    label: 'Grants Management',
    subItems: [
      { label: 'Grants Pipeline', icon: GitBranch },
      { label: 'Getting Started', icon: BookOpen },
      { label: 'Grant Providers', icon: Building2 },
      { label: 'Grants Dashboard', icon: BarChart3 }
    ]
  },
  { 
    label: 'Donor Management',
    subItems: [
      { label: 'Donor Donations', icon: DollarSign },
      { label: 'Donor Activities', icon: Activity },
      { label: 'Donor Dashboard', icon: PieChart },
      { label: 'Getting Started', icon: BookOpen }
    ]
  },
  { 
    label: 'monday Fundraising',
    subItems: [
      { label: 'Project Management', icon: Briefcase },
      { label: 'Contacts', icon: Phone },
      { label: 'Learning Center', icon: BookOpen }
    ]
  },
  { 
    label: 'Volunteer Registration Management',
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
  
  console.log('✅ Returning DEFAULT items');
  return defaultWorkspaceItems;
};

// 🆕 DEFAULT EXPORT (for backwards compatibility)
export default defaultWorkspaceItems;