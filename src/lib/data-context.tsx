'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { collection, getDocs, query, where, orderBy, doc, getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { Product, Category, Review, SiteSettings, Enquiry, ContactSubmission } from './types';
import { defaultSettings, seedProducts, seedCategories, seedReviews, seedEnquiries, seedContacts } from './seed-data';

interface DataContextType {
  // Products
  products: Product[];
  featuredProducts: Product[];
  getProduct: (slug: string) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  searchProducts: (query: string) => Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> & { id?: string; createdAt?: string | Date; updatedAt?: string | Date }) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loading: boolean;
  // Categories
  categories: Category[];
  getCategory: (slug: string) => Category | undefined;
  addCategory: (category: Omit<Category, 'id'> & { id?: string }) => Promise<void>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'> & { id?: string; createdAt?: string | Date }) => Promise<void>;
  updateReview: (id: string, updates: Partial<Review>) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  // Settings
  settings: SiteSettings;
  updateSettings: (updates: Partial<SiteSettings>) => Promise<void>;
  // Enquiry & Contacts
  enquiries: Enquiry[];
  contacts: ContactSubmission[];
  trackEnquiry: (enquiry: Omit<Enquiry, 'id'>) => Promise<void>;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => Promise<void>;
  submitContact: (contact: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateContactStatus: (id: string, status: ContactSubmission['status']) => Promise<void>;
  // Firebase status
  isFirebaseConfigured: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}

function isFirebaseReady(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFirebaseConfigured] = useState(isFirebaseReady());

  useEffect(() => {
    async function loadData() {
      // First check local storage for persisted modifications
      const localProducts = typeof window !== 'undefined' ? localStorage.getItem('senseme_products') : null;
      const localCategories = typeof window !== 'undefined' ? localStorage.getItem('senseme_categories') : null;
      const localReviews = typeof window !== 'undefined' ? localStorage.getItem('senseme_reviews') : null;
      const localSettings = typeof window !== 'undefined' ? localStorage.getItem('senseme_settings') : null;
      const localEnquiries = typeof window !== 'undefined' ? localStorage.getItem('senseme_enquiries') : null;
      const localContacts = typeof window !== 'undefined' ? localStorage.getItem('senseme_contacts') : null;

      if (isFirebaseConfigured) {
        try {
          const [productsSnap, categoriesSnap, reviewsSnap, settingsSnap, enquiriesSnap, contactsSnap] = await Promise.all([
            getDocs(query(collection(db, 'products'), where('status', '==', 'published'), orderBy('sortOrder'))),
            getDocs(query(collection(db, 'categories'), where('enabled', '==', true), orderBy('sortOrder'))),
            getDocs(query(collection(db, 'reviews'), where('published', '==', true))),
            getDoc(doc(db, 'settings', 'site')),
            getDocs(collection(db, 'enquiries')),
            getDocs(collection(db, 'contacts')),
          ]);

          const loadedProducts = productsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Product[];
          const loadedCategories = categoriesSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Category[];
          const loadedReviews = reviewsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Review[];
          const loadedEnquiries = enquiriesSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Enquiry[];
          const loadedContacts = contactsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as ContactSubmission[];

          setProducts(loadedProducts.length > 0 ? loadedProducts : (localProducts ? JSON.parse(localProducts) : seedProducts));
          setCategories(loadedCategories.length > 0 ? loadedCategories : (localCategories ? JSON.parse(localCategories) : seedCategories));
          setReviews(loadedReviews.length > 0 ? loadedReviews : (localReviews ? JSON.parse(localReviews) : seedReviews));
          setEnquiries(loadedEnquiries.length > 0 ? loadedEnquiries : (localEnquiries ? JSON.parse(localEnquiries) : seedEnquiries));
          setContacts(loadedContacts.length > 0 ? loadedContacts : (localContacts ? JSON.parse(localContacts) : seedContacts));

          if (settingsSnap.exists()) {
            setSettings(settingsSnap.data() as SiteSettings);
          } else if (localSettings) {
            setSettings(JSON.parse(localSettings));
          }
        } catch (error) {
          console.warn('Firebase error, using local/seed fallback:', error);
          setProducts(localProducts ? JSON.parse(localProducts) : seedProducts);
          setCategories(localCategories ? JSON.parse(localCategories) : seedCategories);
          setReviews(localReviews ? JSON.parse(localReviews) : seedReviews);
          setSettings(localSettings ? JSON.parse(localSettings) : defaultSettings);
          setEnquiries(localEnquiries ? JSON.parse(localEnquiries) : seedEnquiries);
          setContacts(localContacts ? JSON.parse(localContacts) : seedContacts);
        }
      } else {
        setProducts(localProducts ? JSON.parse(localProducts) : seedProducts);
        setCategories(localCategories ? JSON.parse(localCategories) : seedCategories);
        setReviews(localReviews ? JSON.parse(localReviews) : seedReviews);
        setSettings(localSettings ? JSON.parse(localSettings) : defaultSettings);
        setEnquiries(localEnquiries ? JSON.parse(localEnquiries) : seedEnquiries);
        setContacts(localContacts ? JSON.parse(localContacts) : seedContacts);
      }
      setLoading(false);
    }
    loadData();
  }, [isFirebaseConfigured]);

  const featuredProducts = products.filter(p => p.featured);

  const getProduct = useCallback((slug: string) => {
    return products.find(p => p.slug === slug);
  }, [products]);

  const getProductsByCategory = useCallback((categoryId: string) => {
    return products.filter(p => p.categoryId === categoryId);
  }, [products]);

  const searchProducts = useCallback((q: string) => {
    const lower = q.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(lower) ||
      p.shortDescription.toLowerCase().includes(lower) ||
      p.tags.some(t => t.toLowerCase().includes(lower)) ||
      p.categoryName?.toLowerCase().includes(lower) ||
      p.sku.toLowerCase().includes(lower) ||
      p.aromaProfile?.topNotes?.some(n => n.toLowerCase().includes(lower)) ||
      p.aromaProfile?.middleNotes?.some(n => n.toLowerCase().includes(lower)) ||
      p.aromaProfile?.baseNotes?.some(n => n.toLowerCase().includes(lower))
    );
  }, [products]);

  const getCategory = useCallback((slug: string) => {
    return categories.find(c => c.slug === slug);
  }, [categories]);

  // Products CRUD
  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> & { id?: string; createdAt?: string | Date; updatedAt?: string | Date }) => {
    const newId = productData.id || `prod-${Date.now()}`;
    const newProduct: Product = {
      ...productData,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    if (typeof window !== 'undefined') localStorage.setItem('senseme_products', JSON.stringify(updated));
    if (isFirebaseConfigured) {
      try {
        await addDoc(collection(db, 'products'), newProduct);
      } catch (e) {
        console.warn('Failed to add product to Firebase:', e);
      }
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const updated = products.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p);
    setProducts(updated);
    if (typeof window !== 'undefined') localStorage.setItem('senseme_products', JSON.stringify(updated));
    if (isFirebaseConfigured) {
      try {
        await updateDoc(doc(db, 'products', id), updates);
      } catch (e) {
        console.warn('Failed to update product in Firebase:', e);
      }
    }
  };

  const deleteProduct = async (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    if (typeof window !== 'undefined') localStorage.setItem('senseme_products', JSON.stringify(updated));
    if (isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (e) {
        console.warn('Failed to delete product from Firebase:', e);
      }
    }
  };

  // Categories CRUD
  const addCategory = async (catData: Omit<Category, 'id'> & { id?: string }) => {
    const newId = catData.id || `cat-${Date.now()}`;
    const newCat: Category = { ...catData, id: newId };
    const updated = [...categories, newCat];
    setCategories(updated);
    if (typeof window !== 'undefined') localStorage.setItem('senseme_categories', JSON.stringify(updated));
    if (isFirebaseConfigured) {
      try {
        await addDoc(collection(db, 'categories'), newCat);
      } catch (e) {
        console.warn('Failed to add category to Firebase:', e);
      }
    }
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    const updated = categories.map(c => c.id === id ? { ...c, ...updates } : c);
    setCategories(updated);
    if (typeof window !== 'undefined') localStorage.setItem('senseme_categories', JSON.stringify(updated));
    if (isFirebaseConfigured) {
      try {
        await updateDoc(doc(db, 'categories', id), updates);
      } catch (e) {
        console.warn('Failed to update category in Firebase:', e);
      }
    }
  };

  const deleteCategory = async (id: string) => {
    const updated = categories.filter(c => c.id !== id);
    setCategories(updated);
    if (typeof window !== 'undefined') localStorage.setItem('senseme_categories', JSON.stringify(updated));
    if (isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'categories', id));
      } catch (e) {
        console.warn('Failed to delete category from Firebase:', e);
      }
    }
  };

  // Reviews CRUD
  const addReview = async (reviewData: Omit<Review, 'id' | 'createdAt'> & { id?: string; createdAt?: string | Date }) => {
    const newId = reviewData.id || `rev-${Date.now()}`;
    const newRev: Review = { ...reviewData, id: newId, createdAt: reviewData.createdAt || new Date().toISOString() };
    const updated = [newRev, ...reviews];
    setReviews(updated);
    if (typeof window !== 'undefined') localStorage.setItem('senseme_reviews', JSON.stringify(updated));
    if (isFirebaseConfigured) {
      try {
        await addDoc(collection(db, 'reviews'), newRev);
      } catch (e) {
        console.warn('Failed to add review to Firebase:', e);
      }
    }
  };

  const updateReview = async (id: string, updates: Partial<Review>) => {
    const updated = reviews.map(r => r.id === id ? { ...r, ...updates } : r);
    setReviews(updated);
    if (typeof window !== 'undefined') localStorage.setItem('senseme_reviews', JSON.stringify(updated));
    if (isFirebaseConfigured) {
      try {
        await updateDoc(doc(db, 'reviews', id), updates);
      } catch (e) {
        console.warn('Failed to update review in Firebase:', e);
      }
    }
  };

  const deleteReview = async (id: string) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    if (typeof window !== 'undefined') localStorage.setItem('senseme_reviews', JSON.stringify(updated));
    if (isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'reviews', id));
      } catch (e) {
        console.warn('Failed to delete review from Firebase:', e);
      }
    }
  };

  // Settings
  const updateSettings = async (updates: Partial<SiteSettings>) => {
    const updated = { ...settings, ...updates };
    setSettings(updated);
    if (typeof window !== 'undefined') localStorage.setItem('senseme_settings', JSON.stringify(updated));
    if (isFirebaseConfigured) {
      try {
        await updateDoc(doc(db, 'settings', 'site'), updates);
      } catch (e) {
        console.warn('Failed to update settings in Firebase:', e);
      }
    }
  };

  // Enquiries & Contacts
  const trackEnquiry = async (enquiry: Omit<Enquiry, 'id'>) => {
    const newEnq: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    const updated = [newEnq, ...enquiries];
    setEnquiries(updated);
    if (typeof window !== 'undefined') localStorage.setItem('senseme_enquiries', JSON.stringify(updated));
    if (isFirebaseConfigured) {
      try {
        await addDoc(collection(db, 'enquiries'), { ...enquiry, timestamp: serverTimestamp() });
      } catch (e) {
        console.warn('Could not track enquiry:', e);
      }
    }
  };

  const updateEnquiryStatus = async (id: string, status: Enquiry['status']) => {
    const updated = enquiries.map(e => e.id === id ? { ...e, status } : e);
    setEnquiries(updated);
    if (typeof window !== 'undefined') localStorage.setItem('senseme_enquiries', JSON.stringify(updated));
    if (isFirebaseConfigured) {
      try {
        await updateDoc(doc(db, 'enquiries', id), { status });
      } catch (e) {
        console.warn('Could not update enquiry status:', e);
      }
    }
  };

  const submitContact = async (contact: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>) => {
    const newContact: ContactSubmission = {
      ...contact,
      id: `cnt-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    const updated = [newContact, ...contacts];
    setContacts(updated);
    if (typeof window !== 'undefined') localStorage.setItem('senseme_contacts', JSON.stringify(updated));
    if (isFirebaseConfigured) {
      try {
        await addDoc(collection(db, 'contacts'), {
          ...contact,
          status: 'new',
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.warn('Could not submit contact:', e);
      }
    }
  };

  const updateContactStatus = async (id: string, status: ContactSubmission['status']) => {
    const updated = contacts.map(c => c.id === id ? { ...c, status } : c);
    setContacts(updated);
    if (typeof window !== 'undefined') localStorage.setItem('senseme_contacts', JSON.stringify(updated));
    if (isFirebaseConfigured) {
      try {
        await updateDoc(doc(db, 'contacts', id), { status });
      } catch (e) {
        console.warn('Could not update contact status:', e);
      }
    }
  };

  return (
    <DataContext.Provider value={{
      products,
      featuredProducts,
      getProduct,
      getProductsByCategory,
      searchProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      loading,
      categories,
      getCategory,
      addCategory,
      updateCategory,
      deleteCategory,
      reviews,
      addReview,
      updateReview,
      deleteReview,
      settings,
      updateSettings,
      enquiries,
      contacts,
      trackEnquiry,
      updateEnquiryStatus,
      submitContact,
      updateContactStatus,
      isFirebaseConfigured,
    }}>
      {children}
    </DataContext.Provider>
  );
}
