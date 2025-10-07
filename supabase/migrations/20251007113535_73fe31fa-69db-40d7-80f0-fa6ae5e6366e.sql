-- Create storage bucket for package images
INSERT INTO storage.buckets (id, name, public)
VALUES ('package-images', 'package-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for package images bucket
CREATE POLICY "Public can view package images"
ON storage.objects FOR SELECT
USING (bucket_id = 'package-images');

CREATE POLICY "Admins can upload package images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'package-images');

CREATE POLICY "Admins can update package images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'package-images');

CREATE POLICY "Admins can delete package images"
ON storage.objects FOR DELETE
USING (bucket_id = 'package-images');

-- Add gallery_images column to packages table
ALTER TABLE packages 
ADD COLUMN IF NOT EXISTS gallery_images text[] DEFAULT '{}';