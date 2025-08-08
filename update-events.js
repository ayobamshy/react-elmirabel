// Update Supabase events with new image URLs
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updateEventImages() {
  try {
    console.log('Updating events in Supabase...');

    // Update Wine Tasting Night
    const { data: wineTastingData, error: wineTastingError } = await supabase
      .from('events')
      .update({ 
        image: 'https://images.unsplash.com/photo-1506377247379-2c0b5d1e5a3b?auto=format&fit=crop&w=800&q=80' 
      })
      .eq('title', 'Wine Tasting Night');
    
    if (wineTastingError) {
      console.error('Error updating Wine Tasting Night:', wineTastingError);
    } else {
      console.log('✅ Wine Tasting Night updated successfully');
    }

    // Update Harvest Festival Gala
    const { data: harvestData, error: harvestError } = await supabase
      .from('events')
      .update({ 
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80' 
      })
      .eq('title', 'Harvest Festival Gala');
    
    if (harvestError) {
      console.error('Error updating Harvest Festival Gala:', harvestError);
    } else {
      console.log('✅ Harvest Festival Gala updated successfully');
    }

    // Verify updates
    const { data: updatedEvents, error: verifyError } = await supabase
      .from('events')
      .select('*');
    
    if (verifyError) {
      console.error('Error verifying updates:', verifyError);
    } else {
      console.log('📋 Updated events:');
      updatedEvents.forEach(event => {
        console.log(`- ${event.title}: ${event.image}`);
      });
    }

    console.log('🎉 Event images updated in Supabase!');
  } catch (error) {
    console.error('❌ Error updating events:', error);
  }
}

updateEventImages();
