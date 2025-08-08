-- SQL commands to update event images in Supabase
-- Run these commands in your Supabase SQL editor

-- Update Wine Tasting Night image
UPDATE events 
SET image = 'https://images.unsplash.com/photo-1506377247379-2c0b5d1e5a3b?auto=format&fit=crop&w=800&q=80'
WHERE title = 'Wine Tasting Night';

-- Update Harvest Festival Gala image  
UPDATE events 
SET image = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80'
WHERE title = 'Harvest Festival Gala';

-- Verify the updates
SELECT id, title, image FROM events 
WHERE title IN ('Wine Tasting Night', 'Harvest Festival Gala');

-- Alternative: If you need to update by ID instead of title
-- First check current IDs:
SELECT id, title, image FROM events ORDER BY id;
