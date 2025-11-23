import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import type {
  Book,
  CreateBookDto,
  UpdateBookDto,
  User,
  Plan,
  Event,
  FollowUp,
  Notification,
  ApiResponse,
  PaginatedResponse,
} from '@book-store/shared-types';

export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });

    // Add request interceptor for auth tokens
    this.client.interceptors.request.use((config) => {
      const token = this.getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
          this.onUnauthorized();
        }
        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    // Override this method to provide token from storage
    return null;
  }

  private onUnauthorized(): void {
    // Override this method to handle unauthorized errors
    console.warn('Unauthorized access');
  }

  // Books API
  async getBooks(): Promise<Book[]> {
    const response = await this.client.get<Book[]>('/books');
    return response.data;
  }

  async getBook(id: string): Promise<Book> {
    const response = await this.client.get<Book>(`/books/${id}`);
    return response.data;
  }

  async createBook(data: CreateBookDto): Promise<Book> {
    const response = await this.client.post<Book>('/books', data);
    return response.data;
  }

  async updateBook(id: string, data: UpdateBookDto): Promise<Book> {
    const response = await this.client.patch<Book>(`/books/${id}`, data);
    return response.data;
  }

  async deleteBook(id: string): Promise<void> {
    await this.client.delete(`/books/${id}`);
  }

  // Users API
  async getUsers(): Promise<User[]> {
    const response = await this.client.get<User[]>('/users');
    return response.data;
  }

  async getUser(id: string): Promise<User> {
    const response = await this.client.get<User>(`/users/${id}`);
    return response.data;
  }

  async createUser(data: Partial<User>): Promise<User> {
    const response = await this.client.post<User>('/users', data);
    return response.data;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const response = await this.client.patch<User>(`/users/${id}`, data);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await this.client.delete(`/users/${id}`);
  }

  // Plans API
  async getPlans(): Promise<Plan[]> {
    const response = await this.client.get<Plan[]>('/plans');
    return response.data;
  }

  async getPlan(id: string): Promise<Plan> {
    const response = await this.client.get<Plan>(`/plans/${id}`);
    return response.data;
  }

  async createPlan(data: Partial<Plan>): Promise<Plan> {
    const response = await this.client.post<Plan>('/plans', data);
    return response.data;
  }

  async updatePlan(id: string, data: Partial<Plan>): Promise<Plan> {
    const response = await this.client.patch<Plan>(`/plans/${id}`, data);
    return response.data;
  }

  async deletePlan(id: string): Promise<void> {
    await this.client.delete(`/plans/${id}`);
  }

  // Events API
  async getEvents(): Promise<Event[]> {
    const response = await this.client.get<Event[]>('/events');
    return response.data;
  }

  async getEvent(id: string): Promise<Event> {
    const response = await this.client.get<Event>(`/events/${id}`);
    return response.data;
  }

  async createEvent(data: Partial<Event>): Promise<Event> {
    const response = await this.client.post<Event>('/events', data);
    return response.data;
  }

  async updateEvent(id: string, data: Partial<Event>): Promise<Event> {
    const response = await this.client.patch<Event>(`/events/${id}`, data);
    return response.data;
  }

  async deleteEvent(id: string): Promise<void> {
    await this.client.delete(`/events/${id}`);
  }

  // Follow-ups API
  async getFollowUps(): Promise<FollowUp[]> {
    const response = await this.client.get<FollowUp[]>('/followups');
    return response.data;
  }

  async getFollowUp(id: string): Promise<FollowUp> {
    const response = await this.client.get<FollowUp>(`/followups/${id}`);
    return response.data;
  }

  async createFollowUp(data: Partial<FollowUp>): Promise<FollowUp> {
    const response = await this.client.post<FollowUp>('/followups', data);
    return response.data;
  }

  async updateFollowUp(id: string, data: Partial<FollowUp>): Promise<FollowUp> {
    const response = await this.client.patch<FollowUp>(`/followups/${id}`, data);
    return response.data;
  }

  async deleteFollowUp(id: string): Promise<void> {
    await this.client.delete(`/followups/${id}`);
  }

  // Notifications API
  async getNotifications(): Promise<Notification[]> {
    const response = await this.client.get<Notification[]>('/notifications');
    return response.data;
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await this.client.patch(`/notifications/${id}/read`);
  }
}

// Export a factory function to create client instances
export const createApiClient = (baseURL: string, config?: AxiosRequestConfig): ApiClient => {
  return new ApiClient(baseURL, config);
};

export default ApiClient;
