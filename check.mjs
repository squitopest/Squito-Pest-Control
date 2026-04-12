import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  // Hit openapi endpoint to see all tables PostgREST knows about
  const res = await fetch(url, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Accept': 'application/openapi+json'
    }
  });
  
  if (res.ok) {
    const data = await res.json();
    console.log(Object.keys(data.paths).filter(p => !p.startsWith('/rpc')));
  } else {
    console.log("Error:", res.status, await res.text());
  }
}
run();
