import { supabase } from '@/integrations/supabase/client';

export interface SupabaseTestResults {
  connection: boolean;
  auth: boolean;
  database: boolean;
  tables: string[];
  errors: string[];
}

export async function testSupabaseConnection(): Promise<SupabaseTestResults> {
  const results: SupabaseTestResults = {
    connection: false,
    auth: false,
    database: false,
    tables: [],
    errors: [],
  };

  try {
    // Test 1: Check if Supabase client is initialized
    if (!supabase) {
      results.errors.push('Supabase client is not initialized');
      return results;
    }

    // Test 2: Test authentication connection
    try {
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError) {
        results.errors.push(`Auth error: ${authError.message}`);
      } else {
        results.auth = true;
        results.connection = true;
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      results.errors.push(`Auth connection failed: ${message}`);
    }

    // Test 3: Test database connection by querying a simple table
    const tablesToTest = ['profiles', 'employer_profiles', 'jobs', 'skills'];
    
    for (const table of tablesToTest) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          results.errors.push(`Table ${table}: ${error.message}`);
        } else {
          results.tables.push(table);
          results.database = true;
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        results.errors.push(`Table ${table} query failed: ${message}`);
      }
    }

    return results;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    results.errors.push(`General error: ${message}`);
    return results;
  }
}

// Function to log test results
export function logTestResults(results: SupabaseTestResults) {
  console.log('=== Supabase Connection Test Results ===');
  console.log(`Connection Status: ${results.connection ? '✅ Connected' : '❌ Failed'}`);
  console.log(`Auth Status: ${results.auth ? '✅ Working' : '❌ Failed'}`);
  console.log(`Database Status: ${results.database ? '✅ Working' : '❌ Failed'}`);
  console.log(`Accessible Tables: ${results.tables.length > 0 ? results.tables.join(', ') : 'None'}`);
  
  if (results.errors.length > 0) {
    console.log('\n❌ Errors:');
    results.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  } else {
    console.log('\n✅ No errors found!');
  }
  
  return results;
}

