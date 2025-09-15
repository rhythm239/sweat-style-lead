import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

const readConfig = () => {
  // Allow multiple sources since VITE_* envs are not available in this environment.
  const url = (globalThis as any)?.SUPABASE_URL || (typeof localStorage !== 'undefined' ? localStorage.getItem('SUPABASE_URL') : null) || (import.meta as any)?.env?.VITE_SUPABASE_URL
  const anonKey = (globalThis as any)?.SUPABASE_ANON_KEY || (typeof localStorage !== 'undefined' ? localStorage.getItem('SUPABASE_ANON_KEY') : null) || (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY
  return { url, anonKey }
}

export const getSupabase = (): SupabaseClient => {
  if (supabaseClient) return supabaseClient
  const { url, anonKey } = readConfig()
  if (!url || !anonKey) {
    throw new Error('Supabase is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY in localStorage or visit /setup for instructions.')
  }
  supabaseClient = createClient(url, anonKey)
  return supabaseClient
}

// Database types
export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image_url?: string
  created_at: string
}


export interface Product {
  id: string
  name: string
  category_id: string
  category?: Category
  description: string
  specifications: string[]
  image_urls: string[]
  featured: boolean
  created_at: string
}

export interface Package {
  id: string
  name: string
  price: string
  description: string
  equipment_list: string[]
  image_url?: string
  featured: boolean
  created_at: string
}

// API functions
export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const { data, error } = await getSupabase()
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data || []
  },

  getBySlug: async (slug: string): Promise<Category | null> => {
    const { data, error } = await getSupabase()
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) return null
    return data
  }
}

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const { data, error } = await getSupabase()
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .order('name')
    
    if (error) throw error
    return data || []
  },

  getByCategory: async (categoryId: string): Promise<Product[]> => {
    const { data, error } = await getSupabase()
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('category_id', categoryId)
      .order('name')
    
    if (error) throw error
    return data || []
  },

  getFeatured: async (): Promise<Product[]> => {
    const { data, error } = await getSupabase()
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('featured', true)
      .limit(8)
    
    if (error) throw error
    return data || []
  },

  getById: async (id: string): Promise<Product | null> => {
    const { data, error } = await getSupabase()
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) return null
    return data
  }
}

export const packageApi = {
  getAll: async (): Promise<Package[]> => {
    const { data, error } = await getSupabase()
      .from('packages')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data || []
  },

  getFeatured: async (): Promise<Package[]> => {
    const { data, error } = await getSupabase()
      .from('packages')
      .select('*')
      .eq('featured', true)
      .order('name')
    
    if (error) throw error
    return data || []
  }
}