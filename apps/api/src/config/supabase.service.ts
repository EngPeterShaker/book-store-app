import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl =
      process.env.SUPABASE_URL || 'https://tmytkcwtghcexpdbudki.supabase.co';
    const supabaseKey =
      process.env.SUPABASE_ANON_KEY ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRteXRrY3d0Z2hjZXhwZGJ1ZGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4Mjk5NzQsImV4cCI6MjA3MDQwNTk3NH0.ZvbEGx6Q01-uS27CTo8mnDkvNf2FtY3eLDbbzhw6M9M';

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
