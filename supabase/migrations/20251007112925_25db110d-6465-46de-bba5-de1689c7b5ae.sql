-- First, get the category ID for benches-racks
DO $$
DECLARE
  benches_category_id uuid;
BEGIN
  SELECT id INTO benches_category_id FROM categories WHERE slug = 'benches-racks';
  
  -- Delete existing products in benches-racks category
  DELETE FROM products WHERE category_id = benches_category_id;
  
  -- Insert the correct benches and racks products
  INSERT INTO products (name, category_id, description, specifications, image_urls, featured)
  VALUES 
    ('Flat Bench', benches_category_id, 'Professional flat bench for heavy lifting', 
     ARRAY['Commercial grade construction', 'Weight capacity: 500kg', 'Non-slip surface'], 
     ARRAY['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop'], false),
    
    ('Incline Bench', benches_category_id, 'Adjustable incline bench for upper chest development', 
     ARRAY['Multiple angle positions', 'Heavy-duty frame', 'Comfortable padding'], 
     ARRAY['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop'], false),
    
    ('Decline Bench', benches_category_id, 'Decline bench for lower chest targeting', 
     ARRAY['Adjustable decline angles', 'Ankle support system', 'Professional grade'], 
     ARRAY['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'], false),
    
    ('Adjustable Bench', benches_category_id, 'Multi-position adjustable bench for versatile training', 
     ARRAY['7 back positions', '3 seat positions', 'Commercial quality'], 
     ARRAY['https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=600&fit=crop'], true),
    
    ('Power Rack', benches_category_id, 'Heavy-duty power rack for safe lifting', 
     ARRAY['Safety spotter arms', 'Pull-up bar included', 'Plate storage pegs', 'Weight capacity: 800kg'], 
     ARRAY['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop'], true);
END $$;