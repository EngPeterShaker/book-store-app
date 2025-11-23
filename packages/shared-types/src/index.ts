// Book types
export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  price: number;
  isbn?: string;
  publishedDate?: string;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBookDto {
  title: string;
  author: string;
  description?: string;
  price: number;
  isbn?: string;
  publishedDate?: string;
  coverImage?: string;
}

export interface UpdateBookDto {
  title?: string;
  author?: string;
  description?: string;
  price?: number;
  isbn?: string;
  publishedDate?: string;
  coverImage?: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt?: string;
  updatedAt?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  SUPERVISOR = 'supervisor',
  TEAM_LEADER = 'team_leader',
  EMPLOYEE = 'employee',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

// Plan types
export interface Plan {
  id: string;
  name: string;
  type: PlanType;
  year: number;
  status: PlanStatus;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum PlanType {
  LEADERSHIP = 'leadership',
  TECHNICAL = 'technical',
  PERFORMANCE = 'performance',
  CAREER = 'career',
}

export enum PlanStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

// Event types
export interface Event {
  id: string;
  title: string;
  description?: string;
  planId: string;
  status: EventStatus;
  eventDate: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum EventStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
}

// Follow-up types
export interface FollowUp {
  id: string;
  eventId: string;
  notes: string;
  nextAction?: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt?: string;
}

export enum NotificationType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
