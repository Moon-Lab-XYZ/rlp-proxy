import { createClient } from '@supabase/supabase-js';
import { APIOutput } from '../types';

const SUPABASE_URL = 'https://ejqulaoqepgougactlja.supabase.co';

const supabase = createClient(SUPABASE_URL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcXVsYW9xZXBnb3VnYWN0bGphIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1Njg2MzQ1OCwiZXhwIjoxOTcyNDM5NDU4fQ.V8uoHMqCn60a78c0NqrhgR2lYoBWMAcXRvTEYyI3FvA');

interface CacheRecord extends APIOutput {
  url: string;
}

const checkForCache = async (url: string): Promise<APIOutput | null> => {
  try {
    let { data, error } = await supabase
      .from('meta-cache')
      .select('*')
      .eq('url', url);

    if (error) {
      console.log(error);
      return null;
    }

    if (data) {
      return data[0] as unknown as APIOutput;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createCache = async (data: CacheRecord): Promise<boolean> => {
  try {
    await supabase.from('meta-cache').insert(data);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { checkForCache, createCache };
