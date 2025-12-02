import { IsString, IsOptional, IsEmail, IsUrl, IsArray, IsInt, IsBoolean, IsHexColor, IsObject } from 'class-validator';

export class CreatePublisherDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  website?: string;

  // Contact Information
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  postal_code?: string;

  // Branding
  @IsUrl()
  @IsOptional()
  logo_url?: string;

  @IsUrl()
  @IsOptional()
  banner_url?: string;

  @IsHexColor()
  @IsOptional()
  brand_color_primary?: string;

  @IsHexColor()
  @IsOptional()
  brand_color_secondary?: string;

  @IsString()
  @IsOptional()
  tagline?: string;

  // Enhanced Description
  @IsString()
  @IsOptional()
  mission_statement?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  specialties?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  awards?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  notable_authors?: string[];

  // Business Info
  @IsInt()
  @IsOptional()
  founded_year?: number;

  @IsObject()
  @IsOptional()
  business_hours?: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  // Social Media
  @IsString()
  @IsOptional()
  social_twitter?: string;

  @IsString()
  @IsOptional()
  social_linkedin?: string;

  @IsString()
  @IsOptional()
  social_instagram?: string;

  @IsString()
  @IsOptional()
  social_facebook?: string;

  @IsString()
  @IsOptional()
  social_youtube?: string;
}
