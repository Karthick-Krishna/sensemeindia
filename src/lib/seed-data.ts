import { Product, Category, Review, SiteSettings, Enquiry, ContactSubmission } from './types';
import rawImportedProducts from './imported-products.json';

// Default site settings - used when Firebase is not configured
export const defaultSettings: SiteSettings = {
  businessName: 'SenseMe India',
  whatsappNumber: '919150870543',
  email: 'contact@sensemeindia.com',
  phone: '+(91) 91508 70543',
  address: 'Mylal Exports, Coimbatore, Tamil Nadu, India',
  instagram: 'https://www.instagram.com/sensemeindia',
  facebook: 'https://www.facebook.com/sensemeindia',
  linkedin: 'https://www.linkedin.com/company/sensemeindia',
  footerText: 'Direct manufacturer supply for pure essential oils, diffuser blends, and custom contract formulations from Coimbatore, India.',
  metaTitle: 'SenseMe India — Essential Oils, Fragrance Oils & Aroma Products',
  metaDescription: 'Discover a comprehensive catalogue of 195+ pure steam-distilled essential oils, diffuser blends, soap & candle fragrances, and ultrasonic machines from SenseMe India (Mylal Exports, Coimbatore).',
};

// Seed categories
export const seedCategories: Category[] = [
  {
    id: 'essential-oils',
    name: 'Essential Oils',
    slug: 'essential-oils',
    description: 'Single-origin steam-distilled and cold-pressed botanical extracts. Meticulously inspected for purity, density, and natural aromatic integrity.',
    image: '/products/images/basil-essential-oil-192-1.jpg',
    enabled: true,
    sortOrder: 1,
  },
  {
    id: 'diffuser-blends',
    name: 'Diffuser Blends',
    slug: 'diffuser-blends',
    description: 'Harmonious atmospheric diffuser blends formulated for hotel lobbies, residential spaces, meditation retreats, and ultrasonic aroma machines.',
    image: '/products/images/luxury-hotel-fragrance-oil-527-1.jpg',
    enabled: true,
    sortOrder: 2,
  },
  {
    id: 'fragrance-oils',
    name: 'Fragrance Oils',
    slug: 'fragrance-oils',
    description: 'High-potency concentrated fragrance oils engineered for cold-process soap manufacturing, agarbatti making, and cosmetic formulations.',
    image: '/products/images/citrus-fragrance-oil-for-soap-making-286-1.png',
    enabled: true,
    sortOrder: 3,
  },
  {
    id: 'candle-making',
    name: 'Candle Making Fragrances',
    slug: 'candle-making',
    description: 'High flashpoint aromatic compounds designed specifically for soy, beeswax, and paraffin candle making with superior hot and cold scent throw.',
    image: '/products/images/bergamot-fragrance-oil-for-candle-making-563-1.jpg',
    enabled: true,
    sortOrder: 4,
  },
  {
    id: 'natural-perfumes',
    name: 'Natural Perfumes',
    slug: 'natural-perfumes',
    description: 'Expressive botanical eau de parfum and concentrated fragrance flacons crafted for men, women, and unisex wear.',
    image: '/products/images/kestrels-amora-perfume-458-1.png',
    enabled: true,
    sortOrder: 5,
  },
  {
    id: 'diffuser-machines',
    name: 'Diffuser Machines',
    slug: 'diffuser-machines',
    description: 'Commercial and residential ultrasonic cold-mist aroma diffusers engineered for continuous, whisper-quiet micro-droplet dispersion.',
    image: '/products/images/ultrasonic-aroma-diffuser-dark-brown-126-1.jpg',
    enabled: true,
    sortOrder: 6,
  },
];

// Clean and validate imported products
export const seedProducts: Product[] = (rawImportedProducts as any[]).map((p, idx) => ({
  id: p.id || `sm-${idx + 1}`,
  name: p.name,
  slug: p.slug,
  sku: p.sku || `SMI-${String(idx + 1).padStart(4, '0')}`,
  categoryId: p.categoryId || 'essential-oils',
  categoryName: p.categoryName || 'Essential Oils',
  subcategory: p.subcategory || 'Pure Essential Oils',
  shortDescription: p.shortDescription || p.description?.slice(0, 160) + '...',
  description: p.description,
  images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [`/products/images/${p.slug}-default.jpg`],
  variants: Array.isArray(p.variants) && p.variants.length > 0 ? p.variants : [
    { name: '15ml', available: true },
    { name: '100ml', available: true },
    { name: '500ml', available: true },
    { name: '1000ml', available: true },
    { name: '5kg Bulk Drum', available: true },
  ],
  availableSizes: p.availableSizes || ['15ml', '100ml', '500ml', '1000ml', '5kg Bulk Drum'],
  botanicalName: p.botanicalName,
  extractionMethod: p.extractionMethod || 'Steam Distillation',
  plantPart: p.plantPart || 'Botanical Extract',
  odourNotes: p.odourNotes || 'Rich, authentic natural aroma',
  sourcePrice: p.sourcePrice, // Internal admin reference only
  sourceUrl: p.sourceUrl,
  featured: idx < 12,
  status: 'published',
  sortOrder: idx + 1,
  tags: p.tags || ['botanical', 'essential-oil', 'pure-extract'],
  application: p.application || 'Suitable for ultrasonic diffuser units, oil burners, soap making, candle making, and bespoke fragrance formulation.',
  safetyInformation: p.safetyInformation || 'For external and ambient use only. Keep out of reach of children and pets. Do not apply undiluted directly to bare skin. Store in a cool place away from sunlight.',
  createdAt: p.createdAt || new Date().toISOString(),
  updatedAt: p.updatedAt || new Date().toISOString(),
}));

// Verified customer reviews
export const seedReviews: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Saravana Kumar',
    content: 'Super aroma essential oils, very good quality. We source in bulk for our wellness studio, and the aromatic consistency across every batch is outstanding.',
    published: true,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: 'rev-2',
    customerName: 'Focus Industries',
    content: 'Very good service and good product quality. Their Coimbatore team coordinates orders seamlessly on WhatsApp, with prompt tracking details on DTDC.',
    published: true,
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
  {
    id: 'rev-3',
    customerName: 'Aura Candle Studio',
    content: 'We use their candle fragrance oils for our artisanal soy wax line. Excellent flashpoint and exceptional scent throw. Delivery is always secure and leak-free.',
    published: true,
    createdAt: new Date(Date.now() - 86400000 * 35).toISOString(),
  },
  {
    id: 'rev-4',
    customerName: 'Kavya K.',
    content: 'I purchased a diffuser and essential oils from Mylal Exports. Outstanding pure quality, and the diffuser comes with replacement and service warranty.',
    published: true,
    createdAt: new Date(Date.now() - 86400000 * 50).toISOString(),
  },
  {
    id: 'rev-5',
    customerName: 'Hasina Shaj',
    content: 'I ordered 32 essential oils and was incredibly impressed with the packaging. Each bottle was fitted with leak-proof seals and double-boxed without a single drop lost.',
    published: true,
    createdAt: new Date(Date.now() - 86400000 * 65).toISOString(),
  },
];

// Seed enquiries
export const seedEnquiries: Enquiry[] = [
  {
    id: 'enq-1',
    productId: 'sm-206',
    productName: 'Frankincense Essential Oil',
    variant: '1000ml',
    quantity: 2,
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    source: 'product_page',
    status: 'new',
  },
  {
    id: 'enq-2',
    productId: 'sm-24',
    productName: 'Almond Oil',
    variant: '5kg Bulk Drum',
    quantity: 1,
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    source: 'wholesale',
    status: 'contacted',
  },
];

// Seed contacts
export const seedContacts: ContactSubmission[] = [
  {
    id: 'cnt-1',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@wellnessresort.in',
    phone: '+91 98450 12345',
    enquiryType: 'wholesale',
    message: 'Looking to purchase 50 units of ultrasonic diffusers and essential oil blends for our luxury resort spa in Ooty.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: 'new',
  },
  {
    id: 'cnt-2',
    name: 'Priya Sundaram',
    email: 'priya@organicskincare.co',
    phone: '+91 97890 54321',
    enquiryType: 'rebranding',
    message: 'We are launching an organic bath and body line. Need private label essential oil bottles (15ml) with custom branded boxes.',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    status: 'replied',
  },
];
