import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function GetTableRows(){
    const tables = [
    'announcements',
    'documents',
    'events',
    'slate',
    'profiles'
  ];
  const rowCounts: { [key: string]: number | null } = {};
  for (const table of tables){
    const { count, error } = await supabase.from(table).select('*', {
      count: 'exact'
    });
    if (error) {
      return new Response(JSON.stringify({
        error: error.message
      }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 400
      });
    }
    rowCounts[table] = count;
  }
  return new Response(JSON.stringify(rowCounts), {
    headers: {
      'Content-Type': 'application/json'
    },
    status: 200
  });
}