// Product types
export interface ProductVariant {
  name: string;
  description?: string;
  available: boolean;
}

export interface AromaProfile {
  topNotes?: string[];
  middleNotes?: string[];
  baseNotes?: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  categoryId: string;
  categoryName?: string;
  shortDescription: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
  application?: string;
  aromaProfile?: AromaProfile;
  usage?: string;
  safetyInformation?: string;
  tags: string[];
  subcategory?: string;
  botanicalName?: string;
  extractionMethod?: string;
  plantPart?: string;
  odourNotes?: string;
  availableSizes?: string[];
  sourcePrice?: number; // Internal admin reference only
  sourceUrl?: string;
  featured: boolean;
  status?: 'draft' | 'published' | 'archived';
  sortOrder?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  parentId?: string;
  enabled: boolean;
  sortOrder: number;
  productCount?: number;
}

export interface Review {
  id: string;
  customerName: string;
  content: string;
  productId?: string;
  productName?: string;
  published: boolean;
  createdAt: Date | string;
}

export interface Enquiry {
  id: string;
  productId: string;
  productName: string;
  variant: string;
  quantity: number;
  timestamp: Date | string;
  source: string;
  status: 'new' | 'contacted' | 'completed' | 'archived';
}

export interface SiteSettings {
  businessName: string;
  whatsappNumber: string;
  email: string;
  phone: string;
  address: string;
  logo?: string;
  favicon?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  footerText: string;
  metaTitle: string;
  metaDescription: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  enquiryType: 'product' | 'wholesale' | 'rebranding' | 'general' | 'other';
  message: string;
  createdAt: Date | string;
  status: 'new' | 'read' | 'replied';
}
