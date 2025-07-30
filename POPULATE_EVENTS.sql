-- SQL commands to populate Supabase events table with missing events
-- Run these commands in your Supabase SQL editor

-- Insert missing events into the events table
INSERT INTO events (title, date, time, image, description, created_at) VALUES 
('Wine Tasting Night', 'August 24, 2025', '7:00 PM', 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad04?auto=format&fit=crop&w=800&q=80', 'Join us for an exclusive tasting of rare vintages and new arrivals, guided by our in-house sommelier.', NOW()),
('Live Jazz & Wine', 'September 10, 2025', '8:00 PM', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80', 'An evening of smooth jazz, fine wine, and great company. Enjoy curated pairings and live music.', NOW()),
('Champagne Brunch', 'September 21, 2025', '11:00 AM', 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', 'A sparkling brunch featuring the world''s finest champagnes and gourmet bites.', NOW()),
('Wine & Cheese Pairing Masterclass', 'October 5, 2025', '6:00 PM', 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80', 'Discover the art of pairing wine and cheese with our expert-led masterclass.', NOW()),
('Harvest Festival Gala', 'October 19, 2025', '7:30 PM', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80', 'Celebrate the harvest season with a gala dinner, live entertainment, and exclusive wine releases.', NOW()),
('Blind Tasting Challenge', 'November 2, 2025', '5:00 PM', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', 'Test your palate in our fun and educational blind tasting competition. Prizes for top tasters!', NOW());

-- Verify the events are inserted
SELECT id, title, date, time, image FROM events ORDER BY id;
