import { supabaseKey, supabaseUrl } from '@/constants/constants';
import { createClient } from '@supabase/supabase-js';
import api from './api';

const client = createClient(supabaseUrl, supabaseKey);


/**
 * client is ensured to be singleton
 */
export default api(client);