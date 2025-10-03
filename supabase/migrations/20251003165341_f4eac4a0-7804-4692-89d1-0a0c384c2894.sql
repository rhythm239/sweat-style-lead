-- Re-insert the packages since they're missing
INSERT INTO packages (name, price, description, equipment_list, image_url, featured)
VALUES 
  ('Bodyforce Pro', '₹5,50,000', 'Perfect starter package for small home gyms', 
   ARRAY['Basic Power Rack', 'Olympic Barbell Set', 'Adjustable Bench', 'Weight Plates Set', 'Rubber Flooring'], 
   'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop', false),
  
  ('Bodyforce Pro Plus', '₹8,50,000', 'Comprehensive setup for serious fitness enthusiasts', 
   ARRAY['Professional Power Rack', 'Olympic Barbell & Dumbbell Set', 'Adjustable Bench', 'Cable Machine', 'Complete Weight Set', 'Premium Flooring'], 
   'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', true),
  
  ('Bodyforce Pro Max', '₹12,50,000', 'Ultimate commercial-grade gym package', 
   ARRAY['Commercial Power Rack System', 'Complete Barbell & Dumbbell Set', 'Multi-Position Bench Set', 'Cable Crossover Machine', 'Leg Press', 'Professional Weight Set', 'Premium Flooring & Mirrors'], 
   'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop', false)
ON CONFLICT DO NOTHING;