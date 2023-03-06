import { supabaseUrl, supabaseKey } from '@/constants';
import { createClient } from '@supabase/supabase-js';
import api from '.';

const client = createClient(supabaseUrl, supabaseKey);

/**
 * client is ensured to be singleton
 */
export default api(client);