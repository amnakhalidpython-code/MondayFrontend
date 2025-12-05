// src/components/signup/data/categoryData.js

export const categoryOptions = {
  product_management: {
    label: 'Product management',
    subOptions: [
      { id: 'cross_team_collaboration', label: 'Cross-team collaboration' },
      { id: 'roadmap_planning', label: 'Roadmap planning' },
      { id: 'sprint_management', label: 'Sprint management' },
      { id: 'tracking_product_metrics', label: 'Tracking product metrics' },
      { id: 'market_research', label: 'Market research' },
      { id: 'prioritize_personal_work', label: 'Prioritize personal work' },
      { id: 'feature_prioritization', label: 'Feature prioritization' },
      { id: 'kanban', label: 'Kanban' },
      { id: 'project_management', label: 'Project management' },
      { id: 'stories_epics_management', label: 'Stories and epics management' },
      { id: 'customer_communication', label: 'Customer communication' },
      { id: 'reports_dashboards', label: 'Reports & dashboards' },
      { id: 'backlog_management', label: 'Backlog management' },
      { id: 'team_management', label: 'Team management' },
      { id: 'release_management', label: 'Release management' },
      { id: 'task_management', label: 'Task management' },
      { id: 'other', label: 'Other' }
    ]
  },
  
  hr: {
    label: 'HR and Recruiting',
    subOptions: [
      { id: 'resource_management', label: 'Resource management' },
      { id: 'employee_onboarding', label: 'Employee onboarding' },
      { id: 'managing_projects_portfolio', label: 'Portfolio management' },
      { id: 'project_management', label: 'Project management' },
      { id: 'onboarding_offboarding', label: 'Onboarding and Offboarding' },
      { id: 'hr_services', label: 'HR services' },
      { id: 'hr_requests', label: 'HR requests' },
      { id: 'managing_routine_processes', label: 'Requests and approvals' },
      { id: 'employee_experience', label: 'Employee experience' },
      { id: 'business_operations', label: 'Business operations' },
      { id: 'company_events', label: 'Company events' },
      { id: 'crm', label: 'CRM' },
      { id: 'reporting_to_executives', label: 'Goals and strategy' },
      { id: 'employee_directory', label: 'Employee directory' },
      { id: 'recruitment_pipeline', label: 'Recruitment pipeline' },
      { id: 'hr_recruiting', label: 'Recruiting and talent acquisition' },
      { id: 'tasks', label: 'Task management' },
      { id: 'other', label: 'Other' }
    ]
  },
  
  pmo: {
    label: 'PMO',
    subOptions: [
      { id: 'managing_projects_portfolio', label: 'Portfolio management' },
      { id: 'reporting_to_executives', label: 'Goals and strategy' },
      { id: 'customer_projects', label: 'Customer projects' },
      { id: 'project_planning', label: 'Project planning' },
      { id: 'software_development', label: 'Software development' },
      { id: 'tasks', label: 'Task management' },
      { id: 'resource_management', label: 'Resource management' },
      { id: 'crm', label: 'CRM' },
      { id: 'managing_routine_processes', label: 'Requests and approvals' },
      { id: 'project_management', label: 'Project management' },
      { id: 'client_projects', label: 'Client projects' },
      { id: 'other', label: 'Other' }
    ]
  },
  
  finance: {
    label: 'Finance',
    subOptions: [
      { id: 'reporting_to_executives', label: 'Goals and strategy' },
      { id: 'managing_routine_processes', label: 'Requests and approvals' },
      { id: 'accounting', label: 'Accounting' },
      { id: 'resource_management', label: 'Resource management' },
      { id: 'billing_invoicing', label: 'Billing and invoicing' },
      { id: 'client_projects', label: 'Client projects' },
      { id: 'project_management', label: 'Project management' },
      { id: 'tasks', label: 'Task management' },
      { id: 'forecast_planning_analytics', label: 'Forecast planning and Analytics' },
      { id: 'crm', label: 'CRM' },
      { id: 'managing_projects_portfolio', label: 'Portfolio management' },
      { id: 'business_operations', label: 'Business operations' },
      { id: 'budget_management', label: 'Budget management' },
      { id: 'other', label: 'Other' }
    ]
  },
  
  marketing: {
    label: 'Marketing',
    subOptions: [
      { id: 'creative', label: 'Creative' },
      { id: 'project_management', label: 'Project management' },
      { id: 'strategic_planning', label: 'Strategic planning' },
      { id: 'marketing_operations', label: 'Marketing operations' },
      { id: 'managing_projects_portfolio', label: 'Portfolio management' },
      { id: 'media_production', label: 'Media production' },
      { id: 'email_marketing', label: 'Email marketing' },
      { id: 'event_management', label: 'Event management' },
      { id: 'social_media_marketing', label: 'Social media' },
      { id: 'tasks', label: 'Task management' },
      { id: 'resource_management', label: 'Resource management' },
      { id: 'content_calendar', label: 'Content calendar' },
      { id: 'reporting_to_executives', label: 'Goals and strategy' },
      { id: 'campaign_tracking', label: 'Campaign tracking' },
      { id: 'crm', label: 'CRM' },
      { id: 'managing_routine_processes', label: 'Requests and approvals' },
      { id: 'other', label: 'Other' }
    ]
  },
  
  operations: {
    label: 'Operations',
    subOptions: [
      { id: 'operations_processes', label: 'Operations processes' },
      { id: 'crm', label: 'CRM' },
      { id: 'managing_projects_portfolio', label: 'Portfolio management' },
      { id: 'resource_management', label: 'Resource management' },
      { id: 'business_operations', label: 'Business operations' },
      { id: 'software_development', label: 'Software development' },
      { id: 'reporting_to_executives', label: 'Goals and strategy' },
      { id: 'managing_routine_processes', label: 'Requests and approvals' },
      { id: 'project_management', label: 'Project management' },
      { id: 'marketing_operations', label: 'Marketing operations' },
      { id: 'tasks', label: 'Task management' },
      { id: 'remote_work', label: 'Remote work' },
      { id: 'event_management', label: 'Event management' },
      { id: 'other', label: 'Other' }
    ]
  },
  
  construction: {
    label: 'Construction',
    subOptions: [
      { id: 'client_projects', label: 'Client projects' },
      { id: 'resource_management', label: 'Resource management' },
      { id: 'managing_projects_portfolio', label: 'Portfolio management' },
      { id: 'crm', label: 'CRM' },
      { id: 'tasks', label: 'Task management' },
      { id: 'managing_routine_processes', label: 'Requests and approvals' },
      { id: 'project_management', label: 'Project management' },
      { id: 'construction_scheduling', label: 'Construction scheduling' },
      { id: 'reporting_to_executives', label: 'Goals and strategy' },
      { id: 'construction_planning', label: 'Construction planning' },
      { id: 'other', label: 'Other' }
    ]
  },
  
  legal: {
    label: 'Legal',
    subOptions: [
      { id: 'resource_management', label: 'Resource management' },
      { id: 'managing_routine_processes', label: 'Requests and approvals' },
      { id: 'project_management', label: 'Project management' },
      { id: 'reporting_to_executives', label: 'Goals and strategy' },
      { id: 'crm', label: 'CRM' },
      { id: 'managing_projects_portfolio', label: 'Portfolio management' },
      { id: 'legal_requests', label: 'Legal requests' },
      { id: 'procurement', label: 'Procurement' },
      { id: 'tasks', label: 'Task management' },
      { id: 'client_projects', label: 'Client projects' },
      { id: 'other', label: 'Other' }
    ]
  },
  
  education: {
    label: 'Education',
    subOptions: [
      { id: 'student_organizations', label: 'Student organizations' },
      { id: 'curriculum_syllabus_management', label: 'Curriculum and Syllabus management' },
      { id: 'managing_projects_portfolio', label: 'Portfolio management' },
      { id: 'managing_routine_processes', label: 'Requests and approvals' },
      { id: 'academic_research', label: 'Academic research' },
      { id: 'group_assignments', label: 'Group assignments' },
      { id: 'resource_management', label: 'Resource management' },
      { id: 'tasks', label: 'Task management' },
      { id: 'business_operations', label: 'Business operations' },
      { id: 'crm', label: 'CRM' },
      { id: 'project_management', label: 'Project management' },
      { id: 'administrative_work', label: 'Administrative work' },
      { id: 'individual_work', label: 'Individual work' },
      { id: 'reporting_to_executives', label: 'Goals and strategy' },
      { id: 'other', label: 'Other' }
    ]
  },
  
  crm: {
    label: 'Sales and CRM',
    subOptions: [
      { id: 'sales_pipeline', label: 'Sales pipeline' },
      { id: 'project_management', label: 'Project management' },
      { id: 'tasks', label: 'Task management' },
      { id: 'leads_capturing', label: 'Leads capturing' },
      { id: 'quotes_invoices', label: 'Quotes and invoices' },
      { id: 'lead_management', label: 'Lead management' },
      { id: 'contact_management', label: 'Contact management' },
      { id: 'marketing_activities', label: 'Marketing activities' },
      { id: 'other', label: 'Other' }
    ]
  },
  
  design_and_creative: {
    label: 'Design and Creative',
    subOptions: [
      { id: 'product_launches', label: 'Product launches' },
      { id: 'creative_planning', label: 'Creative planning' },
      { id: 'project_management', label: 'Project management' },
      { id: 'resource_management', label: 'Resource management' },
      { id: 'reporting_to_executives', label: 'Goals and strategy' },
      { id: 'creative_requests', label: 'Creative requests' },
      { id: 'managing_routine_processes', label: 'Requests and approvals' },
      { id: 'crm', label: 'CRM' },
      { id: 'media_production', label: 'Media production' },
      { id: 'content_calendar', label: 'Content calendar' },
      { id: 'client_projects', label: 'Client projects' },
      { id: 'tasks', label: 'Task management' },
      { id: 'software_development', label: 'Software development' },
      { id: 'managing_projects_portfolio', label: 'Portfolio management' },
      { id: 'other', label: 'Other' }
    ]
  },
  
  tech: {
    label: 'Software development',
    subOptions: [
      { id: 'kanban', label: 'Kanban' },
      { id: 'tracking_product_metrics', label: 'Tracking product metrics' },
      { id: 'market_research', label: 'Market research' },
      { id: 'project_management', label: 'Project management' },
      { id: 'team_management', label: 'Team management' },
      { id: 'stories_epics_management', label: 'Stories and epics management' },
      { id: 'feature_prioritization', label: 'Feature prioritization' },
      { id: 'roadmap_planning', label: 'Roadmap planning' },
      { id: 'release_management', label: 'Release management' },
      { id: 'prioritize_personal_work', label: 'Prioritize personal work' },
      { id: 'backlog_management', label: 'Backlog management' },
      { id: 'sprint_management', label: 'Sprint management' },
      { id: 'reports_dashboards', label: 'Reports & dashboards' },
      { id: 'task_management', label: 'Task management' },
      { id: 'cross_team_collaboration', label: 'Cross-team collaboration' },
      { id: 'customer_communication', label: 'Customer communication' },
      { id: 'other', label: 'Other' }
    ]
  },
  
  information_technology: {
    label: 'IT',
    subOptions: [
      { id: 'tickets_and_requests', label: 'Tickets and Requests' },
      { id: 'managing_projects_portfolio', label: 'Portfolio management' },
      { id: 'resource_management', label: 'Resource management' },
      { id: 'knowledge_base', label: 'Knowledge base' },
      { id: 'reporting_to_executives', label: 'Goals and strategy' },
      { id: 'crm', label: 'CRM' },
      { id: 'software_development', label: 'Software development' },
      { id: 'project_management', label: 'Project management' },
      { id: 'tasks', label: 'Task management' },
      { id: 'it_service_desk', label: 'IT Service desk' },
      { id: 'other', label: 'Other' }
    ]
  },
  
  ngo: {
    label: 'Nonprofits',
    subOptions: [
      { id: 'client_projects', label: 'Client projects' },
      { id: 'software_development', label: 'Software development' },
      { id: 'fundraising_crm', label: 'Donor management' },
      { id: 'volunteers_registration', label: 'Volunteers registration management' },
      { id: 'managing_projects_portfolio', label: 'Portfolio management' },
      { id: 'crm', label: 'CRM' },
      { id: 'project_management', label: 'Project management' },
      { id: 'event_management', label: 'Event management' },
      { id: 'emergency_response', label: 'Emergency Response' },
      { id: 'managing_routine_processes', label: 'Requests and approvals' },
      { id: 'resource_management', label: 'Resource management' },
      { id: 'grants_management', label: 'Grants management' },
      { id: 'business_operations', label: 'Business operations' },
      { id: 'tasks', label: 'Task management' },
      { id: 'reporting_to_executives', label: 'Goals and strategy' },
      { id: 'other', label: 'Other' }
    ]
  },
  
  other: {
    label: 'Other',
    subOptions: [
      { id: 'business_operations', label: 'Business operations' },
      { id: 'digital_asset_management', label: 'Digital asset management' },
      { id: 'project_management', label: 'Project management' },
      { id: 'client_projects', label: 'Client projects' },
      { id: 'crm', label: 'CRM' },
      { id: 'project_planning', label: 'Project planning' },
      { id: 'software_development', label: 'Software development' },
      { id: 'tasks', label: 'Task management' },
      { id: 'content_calendar', label: 'Content calendar' },
      { id: 'managing_projects_portfolio', label: 'Portfolio management' },
      { id: 'sales_pipeline', label: 'Sales pipeline' },
      { id: 'contact_management', label: 'Contact management' },
      { id: 'managing_routine_processes', label: 'Requests and approvals' },
      { id: 'reporting_to_executives', label: 'Goals and strategy' },
      { id: 'strategic_planning', label: 'Strategic planning' },
      { id: 'event_management', label: 'Event management' },
      { id: 'resource_management', label: 'Resource management' },
      { id: 'other', label: 'Other' }
    ]
  }
};

// Main categories for Step 4
export const mainCategories = [
  { id: 'product_management', label: 'Product management' },
  { id: 'hr', label: 'HR and Recruiting' },
  { id: 'pmo', label: 'PMO' },
  { id: 'finance', label: 'Finance' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'operations', label: 'Operations' },
  { id: 'construction', label: 'Construction' },
  { id: 'legal', label: 'Legal' },
  { id: 'education', label: 'Education' },
  { id: 'crm', label: 'Sales and CRM' },
  { id: 'design_and_creative', label: 'Design and Creative' },
  { id: 'tech', label: 'Software development' },
  { id: 'information_technology', label: 'IT' },
  { id: 'ngo', label: 'Nonprofits' },
  { id: 'other', label: 'Other' }
];