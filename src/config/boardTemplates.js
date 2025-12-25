// src/config/boardTemplates.js
// Board Templates for Different Workspaces

export const boardTemplates = {
  // ================================
  // GRANTS PIPELINE BOARD
  // ================================
  'grants-pipeline': {
  title: 'Grants Pipeline',
  newItemText: 'New grant',
  addItemText: 'Add grant',
  columns: [
    { id: 'name', title: 'Grant', type: 'text', width: 320 },
    { id: 'status', title: 'Status', type: 'status', width: 160 },
    { id: 'owner', title: 'Owner', type: 'person', width: 120 },
    { id: 'dueDate', title: 'Due Date', type: 'date', width: 140 },
    { id: 'grantAmount', title: 'Grant Amount', type: 'number', width: 160 },
    { id: 'grantProvider', title: 'Grant Provider', type: 'text', width: 220 }
  ],
  groups: [
    {
      id: 'active',
      name: 'Active Grants',
      color: '#FDAB3D',
      expanded: true,
      tasks: [
        {
          id: '1',
          name: 'Grant Name 1',
          status: 'working',
          owner: { name: 'John Doe', initial: 'JD', color: '#7F8D9C' },
          dueDate: 'Sep 14, 2025',
          grantAmount: 35000,
          grantProvider: 'Organization Name',
          overdue: false
        },
        {
          id: '2',
          name: 'Community Health Initiative Grant',
          status: 'working',
          owner: { name: 'Sarah Chen', initial: 'SC', color: '#00C875' },
          dueDate: 'Oct 20, 2025',
          grantAmount: 75000,
          grantProvider: 'Health Foundation',
          overdue: false
        }
      ]
    },
    {
      id: 'submitted',
      name: 'Grants Submitted',
      color: '#A25DDC',
      expanded: true,
      tasks: [
        {
          id: '3',
          name: 'Grant Name 3',
          status: 'working',
          owner: null,
          dueDate: 'Jun 14, 2025',
          grantAmount: 50000,
          grantProvider: 'Organization Name',
          overdue: true
        },
        {
          id: '4',
          name: 'Grant Name 4',
          status: 'awarded',
          owner: { name: 'Alex Rivera', initial: 'AR', color: '#FDAB3D' },
          dueDate: 'Jul 11, 2025',
          grantAmount: 25000,
          grantProvider: 'Organization Name',
          overdue: true
        },
        {
          id: '5',
          name: 'Grant Name 2',
          status: 'submitted',
          owner: null,
          dueDate: 'Aug 25, 2025',
          grantAmount: 10000,
          grantProvider: 'Organization Name',
          overdue: false
        }
      ]
    }
  ],
  statusConfig: {
    working: { label: 'Working on it', bg: '#FDAB3D' },
    submitted: { label: 'Submitted', bg: '#A25DDC' },
    awarded: { label: 'Awarded', bg: '#00C875' }
  }
},

  // ================================
  // DONORS BOARD
  // ================================
  'donors': {
    title: 'Donors',
    newItemText: 'New donor',
    addItemText: '+ Add donor',
    columns: [
      { id: 'name', title: 'Donor', type: 'text', width: 300 },
      { id: 'status', title: 'Status', type: 'status', width: 150 },
      { id: 'email', title: 'Email', type: 'email', width: 200 },
      { id: 'phone', title: 'Phone', type: 'phone', width: 150 },
      { id: 'donated', title: '$ Donated', type: 'number', width: 120 },
      { id: 'donations', title: 'Donations', type: 'text', width: 200 }
    ],
    groups: [
      {
        id: 'potential',
        name: 'Potential Donors',
        color: '#FF6B6B',
        expanded: true,
        tasks: [
          {
            id: '1',
            name: 'Michael Brown',
            status: 'potential',
            email: 'mbrown@example.com',
            phone: '+1 555-0103',
            donated: 0,
            donations: '-'
          },
          {
            id: '2',
            name: 'David Wilson',
            status: 'potential',
            email: 'dwilson@example.com',
            phone: '+1 555-0105',
            donated: 0,
            donations: '-'
          },
          {
            id: '3',
            name: 'Lisa Anderson',
            status: 'potential',
            email: 'lisa.anderson@example.com',
            phone: '+1 555-0108',
            donated: 0,
            donations: '-'
          }
        ]
      },
      {
        id: 'active',
        name: 'Active Donors',
        color: '#00C875',
        expanded: true,
        tasks: [
          {
            id: '4',
            name: 'John Smith',
            status: 'active',
            email: 'john.smith@example.com',
            phone: '+1 555-0101',
            donated: 5000,
            donations: 'Annual Fund, Building Campaign, Scholarship'
          },
          {
            id: '5',
            name: 'Sarah Johnson',
            status: 'active',
            email: 'sarah.j@example.com',
            phone: '+1 555-0102',
            donated: 10000,
            donations: 'Major Gift, Annual Fund, Endowment'
          },
          {
            id: '6',
            name: 'Emily Davis',
            status: 'active',
            email: 'emily.davis@example.com',
            phone: '+1 555-0104',
            donated: 7500,
            donations: 'Building Campaign, Annual Fund'
          },
          {
            id: '7',
            name: 'Robert Martinez',
            status: 'active',
            email: 'rmartinez@example.com',
            phone: '+1 555-0106',
            donated: 3500,
            donations: 'Annual Fund, Scholarship'
          },
          {
            id: '8',
            name: 'Jennifer Lee',
            status: 'active',
            email: 'jennifer.lee@example.com',
            phone: '+1 555-0107',
            donated: 12000,
            donations: 'Major Gift, Building Campaign, Endowment'
          }
        ]
      }
    ],
    statusConfig: {
      potential: { label: 'Potential', bg: '#FF6B6B' },
      active: { label: 'Active', bg: '#00C875' }
    }
  },

  // ================================
  // PROJECT MANAGEMENT BOARD
  // ================================
  'project-management': {
    title: 'Project Management',
    newItemText: 'New project',
    addItemText: '+ Add project',
    columns: [
      { id: 'name', title: 'Project', type: 'text', width: 250 },
      { id: 'owner', title: 'Owner', type: 'person', width: 120 },
      { id: 'client', title: 'Client', type: 'text', width: 150 },
      { id: 'timeline', title: 'Timeline', type: 'daterange', width: 180 },
      { id: 'analysis', title: 'Analysis', type: 'status', width: 140 },
      { id: 'creation', title: 'Creation', type: 'status', width: 140 },
      { id: 'review', title: 'Review', type: 'status', width: 140 },
      { id: 'estHours', title: 'Est. Hours', type: 'text', width: 120 }
    ],
    groups: [
      { id: 'active', name: 'Active Projects', color: '#579BFC', expanded: true, tasks: [] },
      { id: 'finished', name: 'Finished Projects', color: '#00C875', expanded: true, tasks: [] }
    ],
    statusConfig: {
      done: { label: 'Done', bg: '#00C875' },
      working: { label: 'Working on it', bg: '#FDAB3D' },
      stuck: { label: 'Stuck', bg: '#DF2F4A' }
    }
  },

  // ================================
  // VOLUNTEER REGISTRATION BOARD
  // ================================
  'volunteer-registration': {
    title: 'Volunteer registration management',
    newItemText: 'New item',
    addItemText: '+ Add item',
    columns: [
      { id: 'name', title: 'Item', type: 'text', width: 200 },
      { id: 'volunteerManager', title: 'Volunteer manager', type: 'person', width: 150 },
      { id: 'status', title: 'Status', type: 'status', width: 120 },
      { id: 'email', title: 'Email', type: 'email', width: 180 },
      { id: 'phone', title: 'Phone', type: 'phone', width: 140 },
      { id: 'address', title: 'Address', type: 'text', width: 180 },
      { id: 'linkedin', title: 'Linkedin', type: 'link', width: 120 },
      { id: 'skills', title: 'Skills', type: 'tags', width: 150 },
      { id: 'hoursPerWeek', title: 'Hours per week', type: 'number', width: 120 },
      { id: 'startDate', title: 'Volunteer start date', type: 'date', width: 150 }
    ],
    groups: [
      { id: 'new', name: 'New volunteers', color: '#579BFC', expanded: true, tasks: [] },
      { id: 'active', name: 'Active volunteers', color: '#00C875', expanded: true, tasks: [] },
      { id: 'past', name: 'Past volunteers', color: '#CAB641', expanded: true, tasks: [] }
    ],
    statusConfig: {
      new: { label: 'New', bg: '#579BFC' },
      active: { label: 'Active', bg: '#00C875' },
      past: { label: 'Past', bg: '#CAB641' }
    }
  },

  // ================================
  // GETTING STARTED BOARD
  // ================================
  'getting-started': {
    title: 'Getting Started',
    newItemText: 'New task',
    addItemText: '+ Add task',
    columns: [
      { id: 'name', title: 'Task', type: 'text', width: 300 },
      { id: 'owner', title: 'Owner', type: 'person', width: 120 },
      { id: 'status', title: 'Status', type: 'status', width: 150 },
      { id: 'dueDate', title: 'Due Date', type: 'date', width: 120 }
    ],
    groups: [
      { id: 'todo', name: 'To-Do', color: '#579BFC', expanded: true, tasks: [] },
      { id: 'completed', name: 'Completed', color: '#00C875', expanded: true, tasks: [] }
    ],
    statusConfig: {
      working: { label: 'Working on it', bg: '#FDAB3D' },
      done: { label: 'Done', bg: '#00C875' },
      stuck: { label: 'Stuck', bg: '#DF2F4A' }
    }
  },

  // ================================
  // GRANT PROVIDERS BOARD
  // ================================
  'grant-providers': {
    title: 'Grant Providers',
    newItemText: 'New provider',
    addItemText: '+ Add provider',
    columns: [
      { id: 'name', title: 'Provider', type: 'text', width: 300 },
      { id: 'status', title: 'Status', type: 'status', width: 150 },
      { id: 'contact', title: 'Contact', type: 'text', width: 200 },
      { id: 'requirements', title: 'Requirements', type: 'text', width: 250 }
    ],
    groups: [
      { id: 'active', name: 'Active Providers', color: '#00C875', expanded: true, tasks: [] },
      { id: 'research', name: 'Research', color: '#579BFC', expanded: true, tasks: [] }
    ],
    statusConfig: {
      active: { label: 'Active', bg: '#00C875' },
      pending: { label: 'Pending', bg: '#FDAB3D' },
      closed: { label: 'Closed', bg: '#DF2F4A' }
    }
  },

  // ================================
  // GRANTS DASHBOARD BOARD
  // ================================
  'grants-dashboard': {
    title: 'Grants Dashboard',
    newItemText: 'New metric',
    addItemText: '+ Add metric',
    columns: [
      { id: 'name', title: 'Metric', type: 'text', width: 300 },
      { id: 'value', title: 'Value', type: 'number', width: 150 },
      { id: 'status', title: 'Status', type: 'status', width: 150 }
    ],
    groups: [
      { id: 'overview', name: 'Overview', color: '#579BFC', expanded: true, tasks: [] }
    ],
    statusConfig: {
      good: { label: 'Good', bg: '#00C875' },
      warning: { label: 'Warning', bg: '#FDAB3D' },
      critical: { label: 'Critical', bg: '#DF2F4A' }
    }
  }
};

// Helper function to get template by ID
export const getTemplateById = (templateId) => {
  return boardTemplates[templateId] || null;
};

// Helper function to get all template IDs
export const getAllTemplateIds = () => {
  return Object.keys(boardTemplates);
};

export default boardTemplates;