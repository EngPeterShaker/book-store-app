export interface Branch {
  id?: number;
  publisher_id: number;
  branch_name: string;
  branch_type: 'HQ' | 'Office' | 'Warehouse' | 'Bookstore' | 'Distribution Center' | 'Regional Office';
  description?: string;

  // Address
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;

  // Contact
  phone?: string;
  email?: string;

  // Geolocation
  latitude?: number;
  longitude?: number;

  // Operating hours
  hours_of_operation?: Record<string, string>;

  // Metadata
  is_main_branch?: boolean;
  branch_icon_url?: string;

  // Timestamps
  created_at?: string;
  updated_at?: string;
}

export type BranchType = Branch['branch_type'];

export const BRANCH_TYPE_LABELS: Record<BranchType, string> = {
  'HQ': 'Headquarters',
  'Office': 'Office',
  'Warehouse': 'Warehouse',
  'Bookstore': 'Bookstore',
  'Distribution Center': 'Distribution Center',
  'Regional Office': 'Regional Office',
};

export const BRANCH_TYPE_ICONS: Record<BranchType, string> = {
  'HQ': '🏢',
  'Office': '🏛️',
  'Warehouse': '📦',
  'Bookstore': '📚',
  'Distribution Center': '🚚',
  'Regional Office': '🌍',
};
