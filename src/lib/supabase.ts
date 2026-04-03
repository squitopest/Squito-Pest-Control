import { createClient } from "@supabase/supabase-js";

// We create a single robust utility that initializes the generic JS client 
// so it can be used for both client boundaries if needed, or simple server logic.
// For complex Next.js SSR apps, using `@supabase/ssr` with cookies is preferred 
// if you are dealing with Authentication. Since this project primarily writes 
// leads to a database from a server action, a standard highly-privileged client works.

export const createServiceClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mock-project-id.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY || "mock-service-role"
  );
};

export const createAnonClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mock-project-id.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "mock-anon-key"
  );
};
