-- Enable Row Level Security on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Create public read policies for all tables (since this is a public catalog)
CREATE POLICY "Allow public read access to categories"
ON categories FOR SELECT
USING (true);

CREATE POLICY "Allow public read access to products"
ON products FOR SELECT
USING (true);

CREATE POLICY "Allow public read access to packages"
ON packages FOR SELECT
USING (true);