import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://tilqcyddmfapgzuvinsk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpbHFjeWRkbWZhcGd6dXZpbnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzg5NjMsImV4cCI6MjA3MzUxNDk2M30.WYldkeHHTe2gq71X9Z0INwC1pQ2VHfQiNc9yUkPqyso'
)

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
  gallery_images?: string[]
  featured: boolean
  created_at: string
}

// API functions
export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data || []
  },

  getBySlug: async (slug: string): Promise<Category | null> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
    
    if (error) return null
    return data
  }
}

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const { data, error } = await supabase
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
    const { data, error } = await supabase
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
    const { data, error } = await supabase
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
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', id)
      .maybeSingle()
    
    if (error) return null
    return data
  }
}

export const packageApi = {
  getAll: async (): Promise<Package[]> => {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data || []
  },

  getFeatured: async (): Promise<Package[]> => {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('featured', true)
      .order('name')
    
    if (error) throw error
    return data || []
  }
}