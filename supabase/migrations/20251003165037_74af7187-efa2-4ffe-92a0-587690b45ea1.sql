-- First, delete existing benches and racks products
DELETE FROM products WHERE category_id = (SELECT id FROM categories WHERE slug = 'benches-racks');

-- Add new benches and racks products
INSERT INTO products (name, category_id, description, specifications, image_urls, featured)
SELECT 
  name,
  (SELECT id FROM categories WHERE slug = 'benches-racks'),
  description,
  specifications,
  image_urls,
  featured
FROM (
  VALUES
    ('Adjustable Bench', 'Multi-position adjustable bench for versatile workout angles', ARRAY['Adjustable backrest (flat, incline, decline)', '7 backrest positions', 'Heavy-duty steel frame', 'Premium vinyl upholstery', 'Max user weight: 300kg'], ARRAY['https://images.unsplash.com/photo-1517836357463-d25dfeac3438'], false),
    ('Incline Bench', 'Fixed incline bench for targeted upper chest development', ARRAY['Fixed 30-45 degree incline', 'Commercial-grade construction', 'Extra thick padding', 'Non-slip foot pads', 'Max user weight: 350kg'], ARRAY['https://images.unsplash.com/photo-1534438327276-14e5300c3a48'], false),
    ('Decline Bench', 'Decline bench for lower chest and core exercises', ARRAY['Fixed decline angle', 'Ankle lock system', 'Heavy-duty frame', 'Comfortable padding', 'Max user weight: 300kg'], ARRAY['https://images.unsplash.com/photo-1571902943202-507ec2618e8f'], false),
    ('Workout Stool', 'Sturdy workout stool for seated exercises', ARRAY['Adjustable height', 'Compact design', 'Non-slip rubber feet', 'Durable steel construction', 'Max user weight: 200kg'], ARRAY['https://images.unsplash.com/photo-1540497077202-7c8a3999166f'], false)
) AS v(name, description, specifications, image_urls, featured);

-- Update packages with new names and prices
UPDATE packages SET name = 'Bodyforce Pro', price = '₹5,50,000' WHERE name = 'Starter Package';
UPDATE packages SET name = 'Bodyforce Pro Plus', price = '₹8,50,000' WHERE name = 'Professional Package';
UPDATE packages SET name = 'Bodyforce Pro Max', price = '₹12,50,000' WHERE name = 'Elite Package';