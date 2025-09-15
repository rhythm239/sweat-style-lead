

// This file contains the SQL commands to set up your database tables
// Run these in your Supabase SQL editor

export const databaseSchema = `
-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  description TEXT,
  specifications TEXT[] DEFAULT '{}',
  image_urls TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  equipment_list TEXT[] DEFAULT '{}',
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert initial categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('Strength', 'strength', 'Power racks, barbells, dumbbells, and plate-loaded machines for serious strength training.', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'),
('Cardio', 'cardio', 'Treadmills, ellipticals, bikes, and rowing machines for cardiovascular fitness.', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'),
('Benches & Racks', 'benches-racks', 'Professional-grade benches, squat racks, and multi-station systems.', 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop'),
('Accessories', 'accessories', 'Complete your gym with resistance bands, kettlebells, and training accessories.', 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&h=300&fit=crop')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample packages
INSERT INTO packages (name, price, description, equipment_list, image_url, featured) VALUES
('Starter Package', '₹2,50,000', 'Perfect for home gyms and small training spaces.', ARRAY['2x Adjustable Dumbbells (5-50kg)', 'Adjustable Bench', 'Olympic Barbell with Plates', 'Squat Rack', 'Rubber Floor Mats'], 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', false),
('Professional Package', '₹6,50,000', 'Complete commercial-grade gym setup for serious training.', ARRAY['Complete Power Rack System', 'Commercial Treadmill', 'Cable Crossover Machine', 'Complete Dumbbell Set (2.5-50kg)', 'Olympic Barbells & Plates Set', 'Professional Bench Set', 'Functional Training Area Setup'], 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop', true),
('Elite Package', '₹12,00,000', 'Ultimate premium gym experience with all amenities.', ARRAY['Full Commercial Gym Setup', '3x Premium Cardio Machines', 'Complete Strength Training Zone', 'Functional Training Area', 'Recovery & Stretching Zone', 'Sound System Integration', 'Professional Installation & Setup'], 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&h=300&fit=crop', false)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access for packages" ON packages FOR SELECT USING (true);
`;

export const sampleProducts = `
-- Insert sample products for each category
WITH category_ids AS (
  SELECT id, slug FROM categories
)
INSERT INTO products (name, category_id, description, specifications, image_urls, featured) 
SELECT 
  product_data.name,
  category_ids.id,
  product_data.description,
  product_data.specifications,
  product_data.image_urls,
  product_data.featured
FROM category_ids
CROSS JOIN LATERAL (
  VALUES 
    -- Strength equipment
    ('Olympic Barbell Set', 'High-quality Olympic barbell with plates for serious strength training.', ARRAY['45 lbs Olympic Barbell', 'Olympic plates: 2x45lb, 2x25lb, 2x10lb, 2x5lb', 'Chrome finish', 'Knurled grip'], ARRAY['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'], true),
    ('Power Rack Pro', 'Professional power rack for safe heavy lifting and versatile training.', ARRAY['Heavy-duty steel construction', '1000 lbs weight capacity', 'Adjustable safety bars', 'Pull-up bar included', 'Plate storage pegs'], ARRAY['https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=400&fit=crop'], true),
    ('Adjustable Dumbbells', 'Space-saving adjustable dumbbells for home gyms.', ARRAY['5-50 lbs per dumbbell', 'Quick-select weight system', 'Compact design', 'Secure locking mechanism'], ARRAY['https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=600&h=400&fit=crop'], false)
) AS product_data(name, description, specifications, image_urls, featured)
WHERE category_ids.slug = 'strength'

UNION ALL

SELECT 
  product_data.name,
  category_ids.id,
  product_data.description,
  product_data.specifications,
  product_data.image_urls,
  product_data.featured
FROM category_ids
CROSS JOIN LATERAL (
  VALUES 
    -- Cardio equipment
    ('Commercial Treadmill', 'High-performance treadmill for intensive cardio workouts.', ARRAY['3.0 HP motor', '0-12 mph speed range', '0-15% incline', 'Heart rate monitoring', 'Pre-programmed workouts'], ARRAY['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'], true),
    ('Elliptical Trainer', 'Low-impact full-body cardio machine with smooth operation.', ARRAY['Dual-action handlebars', '20 resistance levels', 'Heart rate sensors', 'LCD display', 'Transport wheels'], ARRAY['https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=400&fit=crop'], false),
    ('Rowing Machine', 'Premium rowing machine for full-body cardio and strength.', ARRAY['Air resistance system', 'Performance monitor', 'Ergonomic seat', 'Foldable design', 'Chain drive system'], ARRAY['https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=600&h=400&fit=crop'], true)
) AS product_data(name, description, specifications, image_urls, featured)
WHERE category_ids.slug = 'cardio'

UNION ALL

SELECT 
  product_data.name,
  category_ids.id,
  product_data.description,
  product_data.specifications,
  product_data.image_urls,
  product_data.featured
FROM category_ids
CROSS JOIN LATERAL (
  VALUES 
    -- Benches & Racks
    ('Adjustable Bench Pro', 'Professional adjustable bench for versatile training.', ARRAY['0-90 degree adjustment', '600 lbs weight capacity', 'High-density padding', 'Stable base design', 'Easy angle adjustment'], ARRAY['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'], true),
    ('Squat Rack Elite', 'Heavy-duty squat rack for serious powerlifting.', ARRAY['2x2 inch steel tubing', '1000 lbs capacity', 'Adjustable safety bars', 'J-hooks included', 'Bolt-down option'], ARRAY['https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=400&fit=crop'], false),
    ('Multi-Station Trainer', 'Complete training station with multiple exercise options.', ARRAY['Cable crossover system', 'Pull-up/dip station', 'Lat pulldown', 'Low row', 'Weight stack included'], ARRAY['https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=600&h=400&fit=crop'], true)
) AS product_data(name, description, specifications, image_urls, featured)
WHERE category_ids.slug = 'benches-racks'

UNION ALL

SELECT 
  product_data.name,
  category_ids.id,
  product_data.description,
  product_data.specifications,
  product_data.image_urls,
  product_data.featured
FROM category_ids
CROSS JOIN LATERAL (
  VALUES 
    -- Accessories
    ('Kettlebell Set', 'Complete kettlebell set for functional training.', ARRAY['5-50 lbs range', 'Cast iron construction', 'Wide handle design', 'Flat bottom base', 'Includes storage rack'], ARRAY['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'], false),
    ('Resistance Band Kit', 'Professional resistance bands for strength and rehabilitation.', ARRAY['5 resistance levels', 'Door anchor included', 'Handles and ankle straps', 'Exercise guide', 'Carrying case'], ARRAY['https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=400&fit=crop'], true),
    ('Gym Flooring', 'Heavy-duty rubber flooring for gym protection.', ARRAY['20mm thickness', 'Interlocking tiles', 'Non-slip surface', 'Easy to clean', 'Sound dampening'], ARRAY['https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=600&h=400&fit=crop'], false)
) AS product_data(name, description, specifications, image_urls, featured)
WHERE category_ids.slug = 'accessories';
`;

// Function to initialize the database (for development)
export const initializeDatabase = async () => {
  try {
    console.log('Setting up database tables...')
    
    // Note: In production, run the SQL commands directly in Supabase SQL editor
    // This function is for reference only
    
    return { success: true, message: 'Database schema ready. Please run the SQL commands in your Supabase SQL editor.' }
  } catch (error) {
    console.error('Database setup error:', error)
    return { success: false, error }
  }
}